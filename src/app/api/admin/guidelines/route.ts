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
    const guidelines = await prisma.guideline.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(guidelines);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await requireAdmin();
    const body = await req.json();
    const guideline = await prisma.guideline.create({ data: { ...body, createdBy: adminId } });
    return NextResponse.json(guideline, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, ...body } = await req.json();
    const guideline = await prisma.guideline.update({ where: { id }, data: body });
    return NextResponse.json(guideline);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.guideline.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
