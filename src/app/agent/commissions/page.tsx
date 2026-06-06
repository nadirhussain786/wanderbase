"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const statusColors: Record<string, string> = {
  PENDING:  "bg-amber-100 text-amber-700",
  APPROVED: "bg-blue-100  text-blue-700",
  PAID:     "bg-green-100 text-green-700",
};

const statusIcons: Record<string, any> = {
  PENDING:  Clock,
  APPROVED: CheckCircle,
  PAID:     DollarSign,
};

export default function AgentCommissionsPage() {
  const [data, setData]         = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("ALL");

  useEffect(() => {
    fetch("/api/agent/stats").then((r) => r.json()).then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>;

  const commissions: any[] = data?.commissions ?? [];
  const filtered = filter === "ALL" ? commissions : commissions.filter((c: any) => c.status === filter);

  const totals = {
    ALL:     commissions.reduce((s: number, c: any) => s + c.amount, 0),
    PENDING: commissions.filter((c: any) => c.status === "PENDING").reduce((s: number, c: any) => s + c.amount, 0),
    APPROVED:commissions.filter((c: any) => c.status === "APPROVED").reduce((s: number, c: any) => s + c.amount, 0),
    PAID:    commissions.filter((c: any) => c.status === "PAID").reduce((s: number, c: any) => s + c.amount, 0),
  };

  const summaryCards = [
    { label: "Total Earned",    amount: totals.ALL,      color: "text-primary",   bg: "bg-primary/5",   Icon: DollarSign },
    { label: "Pending Payout",  amount: totals.PENDING,  color: "text-amber-600", bg: "bg-amber-50",    Icon: Clock },
    { label: "Approved",        amount: totals.APPROVED, color: "text-blue-600",  bg: "bg-blue-50",     Icon: CheckCircle },
    { label: "Paid Out",        amount: totals.PAID,     color: "text-green-600", bg: "bg-green-50",    Icon: DollarSign },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
        <p className="text-gray-500 text-sm mt-1">Track your earnings from referred bookings.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
              <c.Icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className={`text-2xl font-bold ${c.color}`}>{formatPrice(c.amount)}</p>
            <p className="text-sm text-gray-500 mt-0.5">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {["ALL", "PENDING", "APPROVED", "PAID"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === s ? "bg-secondary text-white shadow" : "bg-white border border-gray-200 text-gray-600 hover:border-secondary"}`}>
            {s === "ALL" ? "All" : s[0] + s.slice(1).toLowerCase()} ({(s === "ALL" ? commissions : commissions.filter((c: any) => c.status === s)).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Tour</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Traveler</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Amount</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Rate</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-gray-400 py-16">No commissions found.</td></tr>
            ) : filtered.map((c: any, i: number) => {
              const Icon = statusIcons[c.status] ?? Clock;
              return (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-50 hover:bg-gray-50/60">
                  <td className="px-5 py-4 font-medium text-gray-900">{c.booking?.tour?.title ?? "—"}</td>
                  <td className="px-5 py-4 text-gray-600">{c.booking?.user?.name ?? "—"}</td>
                  <td className="px-5 py-4 font-bold text-green-600">{formatPrice(c.amount)}</td>
                  <td className="px-5 py-4 text-gray-500">{c.rate}%</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[c.status]}`}>
                      <Icon className="w-3 h-3" />{c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
