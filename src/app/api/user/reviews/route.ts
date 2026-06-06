import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  tourId:    z.string().min(1),
  bookingId: z.string().optional(),
  rating:    z.number().int().min(1).max(5),
  title:     z.string().min(3),
  content:   z.string().min(10),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId  = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { tourId, bookingId, rating, title, content } = parsed.data;

  const existing = await prisma.review.findFirst({ where: { tourId, userId } });
  if (existing) return NextResponse.json({ error: "You have already reviewed this tour" }, { status: 409 });

  const review = await prisma.review.create({
    data: { tourId, userId, bookingId, rating, title, content },
  });

  return NextResponse.json(review, { status: 201 });
}
