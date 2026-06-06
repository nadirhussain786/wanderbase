"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, Plane, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusConfig: Record<string, { color: string; icon: any }> = {
  CONFIRMED: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  PENDING:   { color: "bg-amber-100 text-amber-700", icon: Clock },
  CANCELLED: { color: "bg-red-100   text-red-600",   icon: XCircle },
  COMPLETED: { color: "bg-blue-100  text-blue-700",  icon: Plane },
};

const paymentColors: Record<string, string> = {
  PAID:     "bg-green-100 text-green-700",
  PENDING:  "bg-amber-100 text-amber-700",
  REFUNDED: "bg-gray-100  text-gray-600",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => { fetch("/api/admin/bookings").then((r) => r.json()).then(setBookings).finally(() => setLoading(false)); }, []);

  const updateBooking = async (id: string, patch: object) => {
    await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
    toast.success("Booking updated");
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } : b));
  };

  const filtered = bookings.filter((b) => {
    const matchSearch = !search || b.user?.name?.toLowerCase().includes(search.toLowerCase()) || b.tour?.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage all tour bookings across the platform.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((s) => {
          const sc = statusConfig[s];
          return (
            <div key={s} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${statusFilter === s ? "border-primary" : "border-transparent bg-white shadow-sm"}`} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}>
              <p className="text-2xl font-bold text-gray-900">{bookings.filter((b) => b.status === s).length}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${sc.color}`}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by traveler or tour…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-primary transition-all max-w-md" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Traveler</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tour</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">Loading…</td></tr>
              ) : filtered.map((b, i) => {
                const sc = statusConfig[b.status] ?? statusConfig.PENDING;
                const StatusIcon = sc.icon;
                return (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          {b.user?.avatar ? <img src={b.user.avatar} alt="" className="w-full h-full object-cover" /> : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">{b.user?.name?.[0]}</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">{b.user?.name}</p>
                          <p className="text-gray-400 text-[11px]">{b.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700 text-xs font-medium max-w-[160px] truncate">{b.tour?.title}</td>
                    <td className="px-4 py-4 text-gray-500 text-xs">{new Date(b.departureDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-gray-700 font-medium text-xs">{b.guests}</td>
                    <td className="px-4 py-4 font-bold text-gray-900 text-xs">{formatPrice(b.totalPrice)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />{b.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${paymentColors[b.paymentStatus] ?? paymentColors.PENDING}`}>{b.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBooking(b.id, { status: e.target.value })}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 focus:border-primary"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirm</option>
                        <option value="COMPLETED">Complete</option>
                        <option value="CANCELLED">Cancel</option>
                      </select>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
