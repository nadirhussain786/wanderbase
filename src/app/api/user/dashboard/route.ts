import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [bookings, wishlists, articles, photos, reviews] = await Promise.all([
    prisma.booking.findMany({
      where: { userId },
      include: { tour: { include: { destination: { select: { name: true, country: true } } } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.wishlist.findMany({
      where: { userId },
      include: { tour: true, destination: true },
    }),
    prisma.article.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.photo.findMany({
      where: { userId },
      include: { destination: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      where: { userId },
      include: { tour: { select: { title: true, imageUrl: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ bookings, wishlists, articles, photos, reviews });
}
