import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Forbidden");
  return (session as any).user.id as string;
}

export async function GET() {
  try {
    await requireAdmin();
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, name: true, avatar: true, email: true } },
        tour: { select: { id: true, title: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, status } = await req.json();
    const review = await prisma.review.update({ where: { id }, data: { status } });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
