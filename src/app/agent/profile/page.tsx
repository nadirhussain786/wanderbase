"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Globe, Phone, FileText, Building2, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function AgentProfilePage() {
  const [data, setData]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]  = useState(false);
  const [form, setForm]      = useState({ name: "", phone: "", bio: "", country: "", companyName: "", website: "" });

  useEffect(() => {
    fetch("/api/agent/stats").then((r) => r.json()).then((d) => {
      setData(d);
      const u = d?.agent?.user;
      const a = d?.agent;
      setForm({
        name:        u?.name        ?? "",
        phone:       u?.phone       ?? "",
        bio:         u?.bio         ?? "",
        country:     u?.country     ?? "",
        companyName: a?.companyName ?? "",
        website:     a?.website     ?? "",
      });
      setLoading(false);
    });
  }, []);

  const upd = (f: string) => (e: any) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/agent/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) toast.success("Profile updated!");
    else toast.error("Failed to update profile");
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>;

  const agent = data?.agent;

  const Field = ({ label, name, type = "text", icon: Icon, ...rest }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
        {type === "textarea" ? (
          <textarea value={form[name as keyof typeof form]} onChange={upd(name)} rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-secondary resize-none" {...rest} />
        ) : (
          <input type={type} value={form[name as keyof typeof form]} onChange={upd(name)} className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-secondary transition-all`} {...rest} />
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Update your personal and business information.</p>
      </div>

      {/* Agent badge */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-linear-to-br from-secondary to-primary rounded-2xl p-5 text-white mb-6 shadow-md flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black">
          {form.name?.[0] ?? "A"}
        </div>
        <div>
          <p className="font-bold text-lg">{form.name}</p>
          <p className="text-white/70 text-sm">{agent?.user?.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">{agent?.status}</span>
            <span className="text-white/60 text-xs">· Referral: <strong>{agent?.referralCode}</strong></span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        {/* Personal */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User className="w-4 h-4 text-secondary" /> Personal Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" name="name" icon={User} placeholder="Your name" />
            <Field label="Phone" name="phone" type="tel" icon={Phone} placeholder="+1 555 0000" />
            <Field label="Country" name="country" icon={Globe} placeholder="e.g. United States" />
            <div className="col-span-2"><Field label="Bio" name="bio" type="textarea" placeholder="Tell travelers about yourself…" /></div>
          </div>
        </motion.div>

        {/* Business */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Business Info</h3>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Company / Agency Name" name="companyName" icon={Building2} placeholder="e.g. Horizon Travel Co." />
            <Field label="Website" name="website" type="url" icon={LinkIcon} placeholder="https://yourwebsite.com" />
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 disabled:opacity-60 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
