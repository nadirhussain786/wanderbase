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
    const articles = await prisma.article.findMany({
      include: { author: { select: { id: true, name: true, avatar: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, ...body } = await req.json();
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...body,
        ...(body.status === "PUBLISHED" && { publishedAt: new Date() }),
      },
    });
    return NextResponse.json(article);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
