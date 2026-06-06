"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, Users, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#10b981", "#f43f5e", "#8b5cf6"];

const monthlyRevenue = [
  { month: "Jan", revenue: 18400, bookings: 24 },
  { month: "Feb", revenue: 22100, bookings: 31 },
  { month: "Mar", revenue: 31500, bookings: 45 },
  { month: "Apr", revenue: 27800, bookings: 38 },
  { month: "May", revenue: 41200, bookings: 57 },
  { month: "Jun", revenue: 53700, bookings: 72 },
  { month: "Jul", revenue: 61400, bookings: 84 },
  { month: "Aug", revenue: 58900, bookings: 79 },
  { month: "Sep", revenue: 44300, bookings: 61 },
  { month: "Oct", revenue: 37800, bookings: 52 },
  { month: "Nov", revenue: 29600, bookings: 41 },
  { month: "Dec", revenue: 48200, bookings: 65 },
];

const userGrowth = [
  { month: "Jan", users: 120 }, { month: "Feb", users: 145 },
  { month: "Mar", users: 189 }, { month: "Apr", users: 224 },
  { month: "May", users: 278 }, { month: "Jun", users: 341 },
  { month: "Jul", users: 398 }, { month: "Aug", users: 452 },
  { month: "Sep", users: 489 }, { month: "Oct", users: 521 },
  { month: "Nov", users: 558 }, { month: "Dec", users: 612 },
];

const destinationPerformance = [
  { name: "Santorini", bookings: 34, revenue: 82600 },
  { name: "Bali", bookings: 28, revenue: 41720 },
  { name: "Machu Picchu", bookings: 22, revenue: 61820 },
  { name: "Maldives", bookings: 18, revenue: 80100 },
  { name: "Kyoto", bookings: 15, revenue: 44085 },
  { name: "Safari Kenya", bookings: 12, revenue: 83400 },
];

const categoryShare = [
  { name: "Beach & Islands",  value: 35 },
  { name: "Adventure",        value: 25 },
  { name: "Cultural",         value: 20 },
  { name: "Wildlife",         value: 12 },
  { name: "Wellness",         value: 8  },
];

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalBookings = monthlyRevenue.reduce((s, m) => s + m.bookings, 0);

  const kpis = [
    { label: "Annual Revenue",  value: formatPrice(totalRevenue), icon: DollarSign, color: "text-green-600",  bg: "bg-green-50" },
    { label: "Total Bookings",  value: totalBookings,             icon: Package,     color: "text-primary",   bg: "bg-primary/5" },
    { label: "Registered Users",value: stats?.users ?? "—",       icon: Users,       color: "text-secondary", bg: "bg-secondary/5" },
    { label: "Revenue Growth",  value: "+18.4%",                  icon: TrendingUp,  color: "text-accent",    bg: "bg-accent/10" },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform-wide performance and trends.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
              <k.icon className={`w-5 h-5 ${k.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue & Bookings Chart */}
      <div className="grid xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Revenue & Bookings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip formatter={(value, name) => name === "revenue" ? formatPrice(value as number) : value} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Bookings by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryShare} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {categoryShare.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryShare.map((c, idx) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[idx % COLORS.length] }} />
                  <span className="text-gray-600">{c.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth */}
      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={userGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" name="Users" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Top Destinations by Revenue</h3>
          <div className="space-y-3">
            {destinationPerformance.map((d, i) => {
              const maxRev = Math.max(...destinationPerformance.map((x) => x.revenue));
              const pct = Math.round((d.revenue / maxRev) * 100);
              return (
                <div key={d.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-800">{d.name}</span>
                    <span className="font-bold text-gray-900">{formatPrice(d.revenue)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} className="h-full rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{d.bookings} bookings</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
