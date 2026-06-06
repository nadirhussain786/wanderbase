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
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true, avatar: true } },
        tour: { select: { title: true, imageUrl: true } },
        commission: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { id, status, paymentStatus } = await req.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { ...(status && { status }), ...(paymentStatus && { paymentStatus }) },
    });
    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
