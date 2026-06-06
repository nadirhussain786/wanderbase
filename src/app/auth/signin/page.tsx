"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const demoAccounts = [
  { label: "Admin", email: "admin@wanderbase.com", password: "Admin@1234", color: "from-violet-500 to-purple-600", icon: "👑" },
  { label: "Agent", email: "james.agent@wanderbase.com", password: "Agent@1234", color: "from-blue-500 to-cyan-500", icon: "🤝" },
  { label: "User", email: "sarah@example.com", password: "User@1234", color: "from-teal-500 to-emerald-500", icon: "👤" },
];

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Welcome back! Redirecting...");

    // Role-based redirect
    const meRes = await fetch("/api/auth/me");
    const me = await meRes.json();
    if (me?.role === "ADMIN") router.push("/admin");
    else if (me?.role === "AGENT") router.push("/agent");
    else router.push("/dashboard");
  };

  const handleDemo = async (acc: typeof demoAccounts[0]) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email: acc.email, password: acc.password, redirect: false });
    if (res?.error) { setError("Demo login failed."); setLoading(false); return; }
    toast.success(`Signed in as ${acc.label}!`);
    if (acc.label === "Admin") router.push("/admin");
    else if (acc.label === "Agent") router.push("/agent");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
              Wander<span className="text-accent">Base</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account to continue your journey.</p>

          {/* Demo Accounts */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.label}
                  onClick={() => handleDemo(acc)}
                  disabled={loading}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gradient-to-br ${acc.color} text-white text-xs font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60`}
                >
                  <span className="text-lg">{acc.icon}</span>
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-400 font-medium">or sign in with email</span></div>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-gray-50"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-px transition-all duration-300 disabled:opacity-60 disabled:translate-y-0"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>

      {/* Right — Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary via-[#0a3460] to-secondary overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative flex flex-col justify-center px-16 text-white">
          <div className="mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">✦ Welcome to WanderBase</p>
            <h2 className="text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-playfair,'Playfair Display',Georgia,serif)" }}>
              Your Next Adventure<br />Starts Here
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">Access your bookings, manage tours, earn commissions, and explore the world with WanderBase.</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: "👑", role: "Admin", desc: "Full platform control" },
              { icon: "🤝", role: "Agent", desc: "Earn commissions on referrals" },
              { icon: "✈️", role: "Traveler", desc: "Book & explore destinations" },
            ].map((r) => (
              <div key={r.role} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="font-semibold text-white">{r.role}</p>
                  <p className="text-white/60 text-sm">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
