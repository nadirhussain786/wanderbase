import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const agentId = (session?.user as any)?.agentId;
  if (!agentId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [agent, commissions, referrals] = await Promise.all([
    prisma.agent.findUnique({ where: { id: agentId }, include: { user: true } }),
    prisma.commission.findMany({
      where: { agentId },
      include: { booking: { include: { tour: { select: { title: true } }, user: { select: { name: true } } } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.referral.findMany({
      where: { agentId },
      include: { agent: { include: { user: { select: { name: true, email: true, avatar: true, createdAt: true } } } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ agent, commissions, referrals });
}
