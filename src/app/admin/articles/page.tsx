"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Trash2, Eye, EyeOff, Archive } from "lucide-react";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  DRAFT:     "bg-amber-100 text-amber-700",
  ARCHIVED:  "bg-gray-100  text-gray-600",
};

export default function AdminArticlesPage() {
  const [items, setItems]     = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("ALL");

  const load = () =>
    fetch("/api/admin/articles").then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); });

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/articles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) { toast.success(`Article ${status.toLowerCase()}`); load(); }
    else toast.error("Failed");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await fetch("/api/admin/articles", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Deleted"); load();
  };

  const filtered = filter === "ALL" ? items : items.filter((a) => a.status === filter);

  const counts = {
    ALL:       items.length,
    PUBLISHED: items.filter((a) => a.status === "PUBLISHED").length,
    DRAFT:     items.filter((a) => a.status === "DRAFT").length,
    ARCHIVED:  items.filter((a) => a.status === "ARCHIVED").length,
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all blog articles and travel stories.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === s ? "bg-primary text-white shadow" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"}`}
          >
            {s === "ALL" ? "All" : s[0] + s.slice(1).toLowerCase()} ({counts[s as keyof typeof counts]})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Article</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Author</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Views</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-16">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-16">No articles found.</td></tr>
            ) : filtered.map((a, i) => (
              <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      {a.coverImage ? <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><FileText className="w-5 h-5 text-gray-400" /></div>}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1 max-w-xs">{a.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-xs">{a.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {a.author?.avatar ? <img src={a.author.avatar} alt={a.author.name} className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-primary">{a.author?.name?.[0]}</span>}
                    </div>
                    <span className="text-gray-700 text-sm">{a.author?.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4"><span className="text-gray-600">{a.category}</span></td>
                <td className="px-5 py-4"><span className="font-medium text-gray-900">{(a.views ?? 0).toLocaleString()}</span></td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[a.status]}`}>{a.status}</span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-400">
                  {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    {a.status !== "PUBLISHED" && (
                      <button onClick={() => setStatus(a.id, "PUBLISHED")} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="Publish"><Eye className="w-4 h-4" /></button>
                    )}
                    {a.status === "PUBLISHED" && (
                      <button onClick={() => setStatus(a.id, "DRAFT")} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors" title="Unpublish"><EyeOff className="w-4 h-4" /></button>
                    )}
                    {a.status !== "ARCHIVED" && (
                      <button onClick={() => setStatus(a.id, "ARCHIVED")} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Archive"><Archive className="w-4 h-4" /></button>
                    )}
                    <button onClick={() => remove(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
