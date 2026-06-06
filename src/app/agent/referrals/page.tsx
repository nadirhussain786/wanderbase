"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Copy, Share2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AgentReferralsPage() {
  const [data, setData]       = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agent/stats").then((r) => r.json()).then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>;

  const agent: any     = data?.agent;
  const referrals: any[] = data?.referrals ?? [];
  const referralCode   = agent?.referralCode ?? "";
  const referralLink   = typeof window !== "undefined" ? `${window.location.origin}/auth/signup?ref=${referralCode}` : "";

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-gray-500 text-sm mt-1">Track travelers who signed up with your referral code.</p>
      </div>

      {/* Referral Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-linear-to-br from-secondary to-primary rounded-2xl p-6 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-white/80" />
          <span className="text-sm font-medium text-white/80">Your Referral Code</span>
        </div>
        <div className="text-4xl font-black tracking-widest mb-4">{referralCode}</div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => copy(referralCode, "Code")} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold backdrop-blur-md transition-colors">
            <Copy className="w-4 h-4" /> Copy Code
          </button>
          <button onClick={() => copy(referralLink, "Link")} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-secondary hover:bg-white/90 rounded-xl text-sm font-semibold transition-colors">
            <Copy className="w-4 h-4" /> Copy Signup Link
          </button>
        </div>
        <p className="text-white/60 text-xs mt-4">Share this link with travelers: <span className="text-white/90 break-all">{referralLink}</span></p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Referrals", value: referrals.length, icon: Users },
          { label: "Commission Rate", value: `${agent?.commissionRate ?? 10}%`, icon: CheckCircle },
          { label: "Total Earned",    value: `$${(agent?.totalEarnings ?? 0).toFixed(2)}`, icon: CheckCircle },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary" />
          <h3 className="font-bold text-gray-900">Referred Travelers ({referrals.length})</h3>
        </div>
        {referrals.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <Users className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p>No referrals yet. Share your link to get started!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {referrals.map((r: any, i: number) => {
              const user = r.agent?.user;
              return (
                <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center overflow-hidden shrink-0">
                    {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : <span className="text-secondary font-bold">{user?.name?.[0] ?? "?"}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{user?.name ?? "Unknown"}</p>
                    <p className="text-xs text-gray-400">{user?.email ?? ""}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Referred</span>
                    <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
