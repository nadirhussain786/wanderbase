import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2).optional(),
  phone:   z.string().optional(),
  bio:     z.string().optional(),
  country: z.string().optional(),
  avatar:  z.string().url().optional().or(z.literal("")),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const user = await prisma.user.update({
    where: { id: userId },
    data: parsed.data,
    select: { id: true, name: true, email: true, phone: true, bio: true, country: true, avatar: true },
  });

  return NextResponse.json(user);
}
