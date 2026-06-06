"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Check, X, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  PENDING:  "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100   text-red-700",
};

export default function AdminReviewsPage() {
  const [items, setItems]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("ALL");

  const load = () =>
    fetch("/api/admin/reviews").then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); });

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) { toast.success(`Review ${status.toLowerCase()}`); load(); }
    else toast.error("Failed");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch("/api/admin/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Deleted"); load();
  };

  const filtered = filter === "ALL" ? items : items.filter((r) => r.status === filter);

  const counts = {
    ALL:      items.length,
    PENDING:  items.filter((r) => r.status === "PENDING").length,
    APPROVED: items.filter((r) => r.status === "APPROVED").length,
    REJECTED: items.filter((r) => r.status === "REJECTED").length,
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Moderate traveler reviews before they go live.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === s ? "bg-primary text-white shadow" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"}`}
          >
            {s === "ALL" ? "All" : s[0] + s.slice(1).toLowerCase()} ({counts[s as keyof typeof counts]})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400 py-16">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No reviews in this category.</p>
        ) : filtered.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {r.user?.avatar ? <img src={r.user.avatar} alt={r.user.name} className="w-full h-full object-cover" /> : <span className="text-primary font-bold text-sm">{r.user?.name?.[0] ?? "?"}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{r.user?.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${statusColors[r.status]}`}>{r.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{r.user?.email} · {new Date(r.createdAt).toLocaleDateString()}</p>

                  {/* Tour info */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <img src={r.tour?.imageUrl} alt={r.tour?.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{r.tour?.title}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                    {r.title && <span className="ml-2 text-sm font-semibold text-gray-800">{r.title}</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.content}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {r.status === "PENDING" && (
                  <>
                    <button onClick={() => updateStatus(r.id, "APPROVED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-xl hover:bg-green-200 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => updateStatus(r.id, "REJECTED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-xl hover:bg-red-200 transition-colors">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                )}
                {r.status === "APPROVED" && (
                  <button onClick={() => updateStatus(r.id, "REJECTED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-xl hover:bg-amber-200 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Unpublish
                  </button>
                )}
                {r.status === "REJECTED" && (
                  <button onClick={() => updateStatus(r.id, "APPROVED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-xl hover:bg-green-200 transition-colors">
                    <Check className="w-3.5 h-3.5" /> Re-approve
                  </button>
                )}
                <button onClick={() => remove(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
