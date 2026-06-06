import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  const agentId = (session?.user as any)?.agentId;
  if (!userId || !agentId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, phone, bio, country, companyName, website } = await req.json();

  await Promise.all([
    prisma.user.update({
      where: { id: userId },
      data: { name, phone, bio, country },
    }),
    prisma.agent.update({
      where: { id: agentId },
      data: { companyName, website },
    }),
  ]);

  return NextResponse.json({ success: true });
}
