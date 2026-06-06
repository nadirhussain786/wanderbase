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
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true, photos: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await requireAdmin();
    const body = await req.json();
    const dest = await prisma.destination.create({
      data: {
        ...body,
        images: JSON.stringify(body.images ?? []),
        category: JSON.stringify(body.category ?? []),
        highlights: JSON.stringify(body.highlights ?? []),
        createdBy: adminId,
      },
    });
    return NextResponse.json(dest, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, ...body } = await req.json();
    const dest = await prisma.destination.update({
      where: { id },
      data: {
        ...body,
        ...(body.images && { images: JSON.stringify(body.images) }),
        ...(body.category && { category: JSON.stringify(body.category) }),
        ...(body.highlights && { highlights: JSON.stringify(body.highlights) }),
      },
    });
    return NextResponse.json(dest);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.destination.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
