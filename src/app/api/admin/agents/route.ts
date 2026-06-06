import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Forbidden");
}

export async function GET() {
  try {
    await requireAdmin();
    const agents = await prisma.agent.findMany({
      include: {
        user: { select: { name: true, email: true, avatar: true, createdAt: true } },
        _count: { select: { commissions: true, referrals: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(agents);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, status, commissionRate } = await req.json();
    const agent = await prisma.agent.update({
      where: { id },
      data: { ...(status && { status }), ...(commissionRate !== undefined && { commissionRate }) },
    });
    return NextResponse.json(agent);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
