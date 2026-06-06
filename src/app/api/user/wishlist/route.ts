import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tourId, destinationId } = await req.json();

  const existing = await prisma.wishlist.findFirst({
    where: { userId, ...(tourId ? { tourId } : { destinationId }) },
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return NextResponse.json({ added: false });
  }

  await prisma.wishlist.create({ data: { userId, tourId, destinationId } });
  return NextResponse.json({ added: true });
}

export async function GET() {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.wishlist.findMany({
    where: { userId },
    select: { tourId: true, destinationId: true },
  });

  return NextResponse.json(items);
}
