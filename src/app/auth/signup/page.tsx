"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, User, Eye, EyeOff, AlertCircle, Phone, ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const roles = [
  {
    value: "USER",
    label: "Traveler",
    icon: "✈️",
    desc: "Book trips, share experiences, write articles",
    color: "border-secondary bg-secondary/5",
    active: "ring-2 ring-secondary",
  },
  {
    value: "AGENT",
    label: "Travel Agent",
    icon: "🤝",
    desc: "Refer travelers and earn commissions",
    color: "border-primary bg-primary/5",
    active: "ring-2 ring-primary",
  },
];

const perks = [
  "Access 100+ curated destinations worldwide",
  "Earn commissions as a travel agent",
  "Track bookings and reviews in one place",
  "Join 50,000+ global travelers",
];

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "USER", agentCode: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const update = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

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

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const pwColors   = ["", "bg-red-400", "bg-amber-400", "bg-green-500"];
  const pwLabels   = ["", "Weak", "Good", "Strong"];

  return (
    <div className="min-h-screen flex">

      {/* ── Left — Visual panel ───────────────────────── */}
      <div className="hidden lg:flex flex-1 relative bg-linear-to-br from-secondary via-[#006d6a] to-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col justify-center px-16 text-white z-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-secondary-light font-semibold text-sm uppercase tracking-widest mb-4 text-accent">
              ✦ Join WanderBase Today
            </p>
            <h2
              className="text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}
            >
              Start Your Journey<br />With Us
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Create your free account and unlock access to curated tours, destination guides, and a global travel community.
            </p>

            <div className="space-y-3.5">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/85 text-sm">{perk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-5 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                {["photo-1494790108755-2616b612b786", "photo-1507003211169-0a1dd7228f2d", "photo-1438761681033-6461ffad8d80"].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?w=40&q=80`}
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
                    alt=""
                  />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">50,000+ travelers trust WanderBase</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-sm">★</span>
              ))}
              <span className="text-white/60 text-sm ml-1">4.9 / 5 average rating</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right — Form ──────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-10 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <Globe className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
              Wander<span className="text-accent">Base</span>
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-7">Join 50,000+ travelers already exploring the world.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, role: r.value }))}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  form.role === r.value
                    ? `${r.color} ${r.active}`
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <span className="text-2xl block mb-2">{r.icon}</span>
                <p className="font-semibold text-gray-900 text-sm">{r.label}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Phone — stacked on mobile, side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+1 555 0000"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={update("password")}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${n <= pwStrength ? pwColors[pwStrength] : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{pwLabels[pwStrength]} password</p>
                </div>
              )}
            </div>

            {form.role === "USER" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Agent Referral Code <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.agentCode}
                  onChange={update("agentCode")}
                  placeholder="e.g. JAMES2024"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50 uppercase tracking-widest"
                />
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-px transition-all duration-300 disabled:opacity-60 disabled:translate-y-0 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
