import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  tourId:          z.string().min(1),
  departureDate:   z.string().min(1),
  guests:          z.number().int().min(1).max(50),
  agentCode:       z.string().optional(),
  specialRequests: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { tourId, departureDate, guests, agentCode, specialRequests } = parsed.data;

  const tour = await prisma.tour.findUnique({ where: { id: tourId } });
  if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });

  const totalPrice = tour.price * guests;

  const booking = await prisma.booking.create({
    data: {
      tourId,
      userId,
      departureDate: new Date(departureDate),
      guests,
      totalPrice,
      agentCode,
      specialRequests,
    },
  });

  // If agent code provided, create commission
  if (agentCode) {
    const agent = await prisma.agent.findFirst({ where: { referralCode: agentCode, status: "ACTIVE" } });
    if (agent) {
      await prisma.commission.create({
        data: {
          agentId:   agent.id,
          bookingId: booking.id,
          amount:    totalPrice * (agent.commissionRate / 100),
          rate:      agent.commissionRate,
        },
      });
    }
  }

  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { tour: { include: { destination: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}
