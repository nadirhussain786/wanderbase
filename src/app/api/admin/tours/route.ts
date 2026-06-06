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
    const tours = await prisma.tour.findMany({
      include: { destination: { select: { name: true, country: true } }, _count: { select: { bookings: true, reviews: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tours);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await requireAdmin();
    const body = await req.json();
    const tour = await prisma.tour.create({
      data: {
        ...body,
        includes: JSON.stringify(body.includes ?? []),
        itinerary: JSON.stringify(body.itinerary ?? []),
        createdBy: adminId,
      },
    });
    return NextResponse.json(tour, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, ...body } = await req.json();
    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...body,
        ...(body.includes && { includes: JSON.stringify(body.includes) }),
        ...(body.itinerary && { itinerary: JSON.stringify(body.itinerary) }),
      },
    });
    return NextResponse.json(tour);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.tour.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
