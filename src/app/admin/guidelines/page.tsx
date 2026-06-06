"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, BookOpen, X, Check } from "lucide-react";
import toast from "react-hot-toast";

const categoryColors: Record<string, string> = {
  SAFETY:  "bg-red-100 text-red-700",
  TRAVEL:  "bg-blue-100 text-blue-700",
  BOOKING: "bg-purple-100 text-purple-700",
  VISA:    "bg-amber-100 text-amber-700",
  GENERAL: "bg-gray-100 text-gray-700",
};

export default function AdminGuidelinesPage() {
  const [guidelines, setGuidelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", content: "", category: "GENERAL" });

  const load = () => fetch("/api/admin/guidelines").then((r) => r.json()).then(setGuidelines).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "", category: "GENERAL" }); setShowForm(true); };
  const openEdit = (g: any) => { setEditing(g); setForm({ title: g.title, content: g.content, category: g.category }); setShowForm(true); };

  const save = async () => {
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch("/api/admin/guidelines", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    toast.success(editing ? "Guideline updated" : "Guideline created");
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this guideline?")) return;
    await fetch("/api/admin/guidelines", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Deleted");
    load();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel Guidelines</h1>
          <p className="text-gray-500 text-sm mt-1">Manage safety, travel, booking, and visa guidelines.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-light transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Guideline
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-xl p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Edit Guideline" : "New Guideline"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary transition-all bg-gray-50" placeholder="Guideline title" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary bg-gray-50">
                  {["SAFETY", "TRAVEL", "BOOKING", "VISA", "GENERAL"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content *</label>
                <textarea rows={5} value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary transition-all bg-gray-50 resize-none" placeholder="Guideline content…" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={save} className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary-light flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> {editing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : guidelines.map((g, i) => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-[#0f4c81]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-bold text-gray-900">{g.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${categoryColors[g.category]}`}>{g.category}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{g.content}</p>
                  <p className="text-gray-300 text-xs mt-2">{new Date(g.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => openEdit(g)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(g.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
