import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [users, agents, bookings, revenue, destinations, tours, articles, pendingReviews] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.agent.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { paymentStatus: "PAID" } }),
    prisma.destination.count({ where: { status: "ACTIVE" } }),
    prisma.tour.count({ where: { status: "ACTIVE" } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.review.count({ where: { status: "PENDING" } }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, avatar: true } }, tour: { select: { title: true } } },
  });

  const monthlyRevenue = await prisma.booking.groupBy({
    by: ["createdAt"],
    where: { paymentStatus: "PAID" },
    _sum: { totalPrice: true },
  });

  return NextResponse.json({
    users, agents, bookings, destinations, tours, articles, pendingReviews,
    revenue: revenue._sum.totalPrice ?? 0,
    recentBookings,
  });
}
