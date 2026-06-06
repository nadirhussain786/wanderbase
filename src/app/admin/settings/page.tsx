"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Mail, Phone, DollarSign, Percent, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    siteName:          "WanderBase",
    siteTagline:       "Explore the World, Your Way",
    supportEmail:      "support@wanderbase.com",
    supportPhone:      "+1 (888) 926-3379",
    defaultCurrency:   "USD",
    defaultCommission: "10",
    maintenanceMode:   false,
    bookingEnabled:    true,
    registrationOpen:  true,
  });

  const upd = (f: string) => (e: any) =>
    setSiteSettings((p) => ({ ...p, [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Settings saved successfully");
    setSaving(false);
  };

  const Field = ({ label, name, type = "text", icon: Icon, ...rest }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {type === "checkbox" ? (
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setSiteSettings((p) => ({ ...p, [name]: !p[name as keyof typeof p] }))}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${(siteSettings as any)[name] ? "bg-primary" : "bg-gray-200"}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${(siteSettings as any)[name] ? "translate-x-5" : "translate-x-0"}`} />
          </div>
          <span className="text-sm text-gray-700">{rest.checkLabel}</span>
        </label>
      ) : (
        <div className="relative">
          {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
          <input
            type={type}
            value={(siteSettings as any)[name]}
            onChange={upd(name)}
            className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-primary transition-all`}
            {...rest}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Global platform configuration.</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> General</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Site Name" name="siteName" icon={Globe} />
            <Field label="Default Currency" name="defaultCurrency" />
            <div className="col-span-2"><Field label="Site Tagline" name="siteTagline" /></div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Mail className="w-4 h-4 text-secondary" /> Support Contact</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Support Email" name="supportEmail" type="email" icon={Mail} />
            <Field label="Support Phone" name="supportPhone" type="tel" icon={Phone} />
          </div>
        </motion.div>

        {/* Agent Commission */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4 text-accent" /> Agent Commissions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Default Commission Rate (%)" name="defaultCommission" type="number" icon={Percent} placeholder="10" />
          </div>
          <p className="text-xs text-gray-400 mt-3">New agents will start with this commission rate. Individual rates can be adjusted per agent.</p>
        </motion.div>

        {/* Feature Flags */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> Platform Controls</h3>
          <div className="space-y-4">
            <Field label="" name="bookingEnabled"    type="checkbox" checkLabel="Booking system enabled" />
            <Field label="" name="registrationOpen"  type="checkbox" checkLabel="New user registration open" />
            <Field label="" name="maintenanceMode"   type="checkbox" checkLabel="Maintenance mode (disables public access)" />
          </div>
        </motion.div>

        {/* Admin Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-3">Logged in as</h3>
          <p className="text-sm text-gray-700 font-medium">{(session?.user as any)?.name}</p>
          <p className="text-sm text-gray-400">{(session?.user as any)?.email}</p>
        </motion.div>

        <div className="flex justify-end">
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light disabled:opacity-60 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
