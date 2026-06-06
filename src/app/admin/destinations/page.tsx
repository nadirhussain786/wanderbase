"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, MapPin, Star, Globe } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  ACTIVE:   "bg-green-100 text-green-700",
  DRAFT:    "bg-amber-100 text-amber-700",
  ARCHIVED: "bg-gray-100  text-gray-600",
};

const EMPTY = { name: "", country: "", continent: "Europe", description: "", imageUrl: "", priceFrom: "", duration: "7 days", category: "", highlights: "", status: "ACTIVE", featured: false };

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const load = () => fetch("/api/admin/destinations").then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const upd = (f: string) => (e: any) => setForm((p: any) => ({ ...p, [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (d: any) => {
    setEditing(d);
    setForm({ ...d, category: Array.isArray(d.category) ? d.category.join(", ") : JSON.parse(d.category ?? "[]").join(", "), highlights: Array.isArray(d.highlights) ? d.highlights.join(", ") : JSON.parse(d.highlights ?? "[]").join(", ") });
    setShowForm(true);
  };

  const save = async () => {
    const payload = { ...form, priceFrom: parseFloat(form.priceFrom), category: form.category.split(",").map((s: string) => s.trim()).filter(Boolean), highlights: form.highlights.split(",").map((s: string) => s.trim()).filter(Boolean) };
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { id: editing.id, ...payload } : payload;
    const res = await fetch("/api/admin/destinations", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { toast.success(editing ? "Updated!" : "Created!"); setShowForm(false); load(); }
    else toast.error("Failed");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    await fetch("/api/admin/destinations", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Deleted"); load();
  };

  const Field = ({ label, name, type = "text", ...rest }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea value={form[name]} onChange={upd(name)} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all resize-none" {...rest} />
      ) : type === "select" ? (
        <select value={form[name]} onChange={upd(name)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary">{rest.options?.map((o: string) => <option key={o}>{o}</option>)}</select>
      ) : type === "checkbox" ? (
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!form[name]} onChange={upd(name)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-700">{rest.checkLabel}</span></label>
      ) : (
        <input type={type} value={form[name]} onChange={upd(name)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all" {...rest} />
      )}
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Destinations</h1><p className="text-gray-500 text-sm mt-1">Manage all travel destinations.</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-light transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-2xl p-7 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Edit Destination" : "New Destination"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name *" name="name" placeholder="e.g. Santorini" />
              <Field label="Country *" name="country" placeholder="e.g. Greece" />
              <Field label="Continent" name="continent" type="select" options={["Europe", "Asia", "Africa", "South America", "Americas", "Oceania"]} />
              <Field label="Duration" name="duration" placeholder="e.g. 7 days" />
              <Field label="Price From ($)" name="priceFrom" type="number" placeholder="e.g. 1299" />
              <Field label="Status" name="status" type="select" options={["ACTIVE", "DRAFT", "ARCHIVED"]} />
              <div className="col-span-2"><Field label="Description *" name="description" type="textarea" placeholder="Describe this destination…" /></div>
              <div className="col-span-2"><Field label="Image URL *" name="imageUrl" placeholder="https://images.unsplash.com/…" /></div>
              <div className="col-span-2"><Field label="Categories (comma-separated)" name="category" placeholder="Beach, Romance, Culture" /></div>
              <div className="col-span-2"><Field label="Highlights (comma-separated)" name="highlights" placeholder="Oia Sunset, Caldera Views, Wine Tasting" /></div>
              <div className="col-span-2"><Field label="" name="featured" type="checkbox" checkLabel="Mark as Featured" /></div>
            </div>
            <div className="flex gap-3 pt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm">Cancel</button>
              <button onClick={save} className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary-light">
                <Check className="w-4 h-4" /> {editing ? "Update" : "Create"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          <p className="col-span-3 text-center text-gray-400 py-16">Loading…</p>
        ) : items.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-44 overflow-hidden">
              <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-1.5">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[d.status]}`}>{d.status}</span>
                {d.featured && <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent text-white">Featured</span>}
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" /><span className="font-bold">{d.name}</span></div>
                <p className="text-white/70 text-xs">{d.country}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" /><span className="text-sm font-bold text-gray-900">{d.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-xs">({d.reviewCount.toLocaleString()})</span>
                </div>
                <span className="text-primary font-bold text-sm">{formatPrice(d.priceFrom)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Globe className="w-3.5 h-3.5" />{d.continent} · {d._count?.tours ?? 0} tours · {d._count?.photos ?? 0} photos
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(d)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => remove(d.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-200 text-red-600 text-xs font-semibold rounded-xl hover:bg-red-50 transition-colors">
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
