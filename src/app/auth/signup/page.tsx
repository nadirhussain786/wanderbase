"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, User, Eye, EyeOff, AlertCircle, Phone } from "lucide-react";
import toast from "react-hot-toast";

const roles = [
  { value: "USER", label: "Traveler", icon: "✈️", desc: "Book trips, share experiences, write articles" },
  { value: "AGENT", label: "Travel Agent", icon: "🤝", desc: "Refer travelers and earn commissions" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "USER", agentCode: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Account created! Please sign in.");
    router.push("/auth/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Globe className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
            Wander<span className="text-accent">Base</span>
          </span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-gray-500 text-sm mb-8">Join 50,000+ travelers already on WanderBase.</p>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setForm((p) => ({ ...p, role: r.value }))}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                form.role === r.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-2xl block mb-2">{r.icon}</span>
              <p className="font-semibold text-gray-900 text-sm">{r.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{r.desc}</p>
            </button>
          ))}
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" required value={form.name} onChange={update("name")} placeholder="John Doe" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+1 555 0000" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type={showPw ? "text" : "password"} required value={form.password} onChange={update("password")} placeholder="Min 8 characters" className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Agent referral code field */}
          {form.role === "USER" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Agent Referral Code <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="text" value={form.agentCode} onChange={update("agentCode")} placeholder="e.g. JAMES2024" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary transition-all bg-gray-50 uppercase" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-px transition-all duration-300 disabled:opacity-60 mt-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
