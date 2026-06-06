import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  role: z.enum(["USER", "AGENT"]),
  agentCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const { name, email, password, phone, role, agentCode } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone, role },
    });

    // If agent registration → create agent profile
    if (role === "AGENT") {
      const code = name.toUpperCase().replace(/\s+/g, "").slice(0, 8) + Math.floor(Math.random() * 1000);
      await prisma.agent.create({
        data: { userId: user.id, referralCode: code, status: "PENDING" },
      });
    }

    // If referred by agent → log referral
    if (agentCode && role === "USER") {
      const agent = await prisma.agent.findUnique({ where: { referralCode: agentCode.toUpperCase() } });
      if (agent) {
        await prisma.referral.create({ data: { agentId: agent.id, userId: user.id } }).catch(() => {});
      }
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (e) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
