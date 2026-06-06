"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, Package, Star, MapPin, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  ACTIVE:   "bg-green-100 text-green-700",
  DRAFT:    "bg-amber-100 text-amber-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

const diffColors: Record<string, string> = {
  EASY:        "bg-green-100 text-green-700",
  MODERATE:    "bg-amber-100 text-amber-700",
  CHALLENGING: "bg-red-100 text-red-700",
};

const EMPTY = {
  title: "", destinationId: "", description: "", imageUrl: "",
  price: "", originalPrice: "", duration: "7 days",
  groupSizeMin: "2", groupSizeMax: "12",
  difficulty: "EASY", includes: "", itinerary: "",
  category: "", badge: "", departure: "Every week",
  status: "ACTIVE", featured: false,
};

export default function AdminToursPage() {
  const [items, setItems]       = useState<any[]>([]);
  const [dests, setDests]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<any | null>(null);
  const [form, setForm]         = useState<any>(EMPTY);

  const load = async () => {
    const [tours, destinations] = await Promise.all([
      fetch("/api/admin/tours").then((r) => r.json()),
      fetch("/api/admin/destinations").then((r) => r.json()),
    ]);
    setItems(Array.isArray(tours) ? tours : []);
    setDests(Array.isArray(destinations) ? destinations : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upd = (f: string) => (e: any) =>
    setForm((p: any) => ({ ...p, [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit   = (t: any) => {
    setEditing(t);
    setForm({
      ...t,
      destinationId:  t.destinationId,
      includes:  (typeof t.includes  === "string" ? JSON.parse(t.includes  ?? "[]") : t.includes  ?? []).join(", "),
      itinerary: (typeof t.itinerary === "string" ? JSON.parse(t.itinerary ?? "[]") : t.itinerary ?? []).join(", "),
    });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.title || !form.destinationId || !form.price) {
      toast.error("Title, destination, and price are required");
      return;
    }
    const payload = {
      ...form,
      price:        parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      groupSizeMin: parseInt(form.groupSizeMin),
      groupSizeMax: parseInt(form.groupSizeMax),
      includes:  form.includes.split(",").map((s: string) => s.trim()).filter(Boolean),
      itinerary: form.itinerary.split(",").map((s: string) => s.trim()).filter(Boolean),
    };
    const method = editing ? "PATCH" : "POST";
    const body   = editing ? { id: editing.id, ...payload } : payload;
    const res = await fetch("/api/admin/tours", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) { toast.success(editing ? "Updated!" : "Created!"); setShowForm(false); load(); }
    else toast.error("Failed to save tour");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this tour?")) return;
    await fetch("/api/admin/tours", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Deleted"); load();
  };

  const Field = ({ label, name, type = "text", ...rest }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea value={form[name]} onChange={upd(name)} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary resize-none" {...rest} />
      ) : type === "select" ? (
        <select value={form[name]} onChange={upd(name)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary">
          {rest.options?.map((o: any) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
      ) : type === "checkbox" ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!form[name]} onChange={upd(name)} className="w-4 h-4 rounded" />
          <span className="text-sm text-gray-700">{rest.checkLabel}</span>
        </label>
      ) : (
        <input type={type} value={form[name]} onChange={upd(name)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary" {...rest} />
      )}
    </div>
  );

  const destOptions = dests.map((d: any) => ({ value: d.id, label: `${d.name}, ${d.country}` }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all tour packages.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-light transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Tour
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-2xl p-7 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Edit Tour" : "New Tour"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><Field label="Title *" name="title" placeholder="e.g. Greek Islands Odyssey" /></div>
              <Field label="Destination *" name="destinationId" type="select" options={[{ value: "", label: "Select destination…" }, ...destOptions]} />
              <Field label="Category" name="category" placeholder="e.g. Island Hopping" />
              <Field label="Price ($) *" name="price" type="number" placeholder="e.g. 2499" />
              <Field label="Original Price ($)" name="originalPrice" type="number" placeholder="e.g. 2999" />
              <Field label="Duration" name="duration" placeholder="e.g. 8 days" />
              <Field label="Departure" name="departure" placeholder="e.g. Every Monday" />
              <Field label="Min Group Size" name="groupSizeMin" type="number" />
              <Field label="Max Group Size" name="groupSizeMax" type="number" />
              <Field label="Difficulty" name="difficulty" type="select" options={["EASY", "MODERATE", "CHALLENGING"]} />
              <Field label="Status" name="status" type="select" options={["ACTIVE", "DRAFT", "ARCHIVED"]} />
              <Field label="Badge (optional)" name="badge" placeholder="e.g. Best Seller" />
              <div className="col-span-2"><Field label="Description *" name="description" type="textarea" placeholder="Describe this tour…" /></div>
              <div className="col-span-2"><Field label="Image URL *" name="imageUrl" placeholder="https://images.unsplash.com/…" /></div>
              <div className="col-span-2"><Field label="What's Included (comma-separated)" name="includes" placeholder="Accommodation, Meals, Guided tours" /></div>
              <div className="col-span-2"><Field label="Itinerary (comma-separated days)" name="itinerary" placeholder="Arrive in Athens, Ferry to Santorini" /></div>
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Tour</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Destination</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Price</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Difficulty</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Stats</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-16">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-16">No tours yet. Add one above.</td></tr>
            ) : items.map((t, i) => (
              <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <img src={t.imageUrl} alt={t.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.duration} · {t.departure}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700">{t.destination?.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-bold text-primary">{formatPrice(t.price)}</span>
                  {t.originalPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(t.originalPrice)}</p>}
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${diffColors[t.difficulty] ?? ""}`}>{t.difficulty}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold text-gold" />{t.rating.toFixed(1)}</span>
                    <span className="flex items-center gap-1"><Package className="w-3 h-3" />{t._count?.bookings ?? 0}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.groupSizeMin}–{t.groupSizeMax}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[t.status]}`}>{t.status}</span>
                  {t.featured && <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent">Featured</span>}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
