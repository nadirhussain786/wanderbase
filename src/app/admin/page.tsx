"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, CalendarCheck, DollarSign, MapPin, Star, FileText, UserCheck, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Stats {
  users: number; agents: number; bookings: number; revenue: number;
  destinations: number; tours: number; articles: number; pendingReviews: number;
  recentBookings: any[];
}

const statCards = (s: Stats) => [
  { label: "Total Revenue", value: formatPrice(s.revenue), icon: DollarSign, grad: "from-emerald-500 to-teal-500", change: "+12.5%" },
  { label: "Total Bookings", value: s.bookings.toLocaleString(), icon: CalendarCheck, grad: "from-blue-500 to-cyan-500", change: "+8.2%" },
  { label: "Active Users", value: s.users.toLocaleString(), icon: Users, grad: "from-violet-500 to-purple-500", change: "+23.1%" },
  { label: "Active Agents", value: s.agents.toLocaleString(), icon: UserCheck, grad: "from-amber-400 to-orange-500", change: "+5.4%" },
  { label: "Destinations", value: s.destinations.toLocaleString(), icon: MapPin, grad: "from-pink-500 to-rose-500", change: "Active" },
  { label: "Tour Packages", value: s.tours.toLocaleString(), icon: Package, grad: "from-indigo-500 to-blue-500", change: "Active" },
  { label: "Articles", value: s.articles.toLocaleString(), icon: FileText, grad: "from-teal-500 to-green-500", change: "Published" },
  { label: "Pending Reviews", value: s.pendingReviews.toLocaleString(), icon: Star, grad: "from-red-400 to-rose-500", change: "Need review" },
];

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  CONFIRMED: { label: "Confirmed", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  PENDING:   { label: "Pending",   icon: Clock,        color: "text-amber-600 bg-amber-50" },
  CANCELLED: { label: "Cancelled", icon: XCircle,      color: "text-red-600 bg-red-50" },
  COMPLETED: { label: "Completed", icon: CheckCircle,  color: "text-blue-600 bg-blue-50" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!stats) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards(stats).map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 bg-gradient-to-br ${card.grad} rounded-xl flex items-center justify-center shadow-sm`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{card.value}</p>
            <p className="text-gray-500 text-xs font-medium">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-primary text-sm font-semibold hover:underline">View all →</a>
        </div>
        <div className="divide-y divide-gray-50">
          {stats.recentBookings.length === 0 && (
            <p className="text-center text-gray-400 py-10 text-sm">No bookings yet</p>
          )}
          {stats.recentBookings.map((b) => {
            const sc = statusConfig[b.status] ?? statusConfig.PENDING;
            const StatusIcon = sc.icon;
            return (
              <div key={b.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  {b.user?.avatar ? (
                    <img src={b.user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-500">
                      {b.user?.name?.[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{b.user?.name}</p>
                  <p className="text-gray-500 text-xs truncate">{b.tour?.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900 text-sm">{formatPrice(b.totalPrice)}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${sc.color}`}>
                    <StatusIcon className="w-3 h-3" /> {sc.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
