"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { DollarSign, Users, Clock, CheckCircle, Copy, TrendingUp, Link2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  PENDING:  "bg-amber-100 text-amber-700",
  APPROVED: "bg-blue-100  text-blue-700",
  PAID:     "bg-green-100 text-green-700",
};

export default function AgentDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch("/api/agent/stats").then((r) => r.json()).then(setData).finally(() => setLoading(false)); }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(data?.agent?.referralCode ?? "");
    toast.success("Referral code copied!");
  };

  const copyLink = () => {
    const link = `${window.location.origin}/auth/signup?ref=${data?.agent?.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" /></div>;

  const agent = data?.agent;
  const commissions = data?.commissions ?? [];
  const referrals = data?.referrals ?? [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {agent?.user?.name}. Here&apos;s your performance summary.</p>
      </div>

      {/* Referral Code */}
      <div className="bg-linear-to-r from-secondary to-primary rounded-2xl p-6 mb-7 text-white">
        <p className="text-white/70 text-sm font-medium mb-2">Your Referral Code</p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
            <Link2 className="w-5 h-5" />
            <span className="text-2xl font-bold font-mono tracking-widest">{agent?.referralCode}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={copyCode} className="flex items-center gap-2 px-4 py-2.5 bg-white/15 border border-white/30 rounded-xl text-sm font-semibold hover:bg-white/25 transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
            <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy Link
            </button>
          </div>
        </div>
        <p className="text-white/50 text-xs mt-3">Share your code — earn {agent?.commissionRate}% commission on every booking you refer.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {[
          { label: "Total Earned", value: formatPrice(agent?.totalEarnings ?? 0), icon: DollarSign, grad: "from-green-500 to-emerald-500", change: "Lifetime" },
          { label: "Pending Payout", value: formatPrice(agent?.pendingAmount ?? 0), icon: Clock, grad: "from-amber-400 to-orange-500", change: "Awaiting" },
          { label: "Total Referrals", value: referrals.length, icon: Users, grad: "from-blue-500 to-cyan-500", change: "Users" },
          { label: "Commissions", value: commissions.length, icon: TrendingUp, grad: "from-violet-500 to-purple-500", change: `${agent?.commissionRate}% rate` },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 bg-linear-to-br ${s.grad} rounded-xl flex items-center justify-center`}><s.icon className="w-5 h-5 text-white" /></div>
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
            <p className="text-gray-500 text-xs font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Commissions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Commissions</h2>
            <a href="/agent/commissions" className="text-secondary text-xs font-semibold hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {commissions.slice(0, 5).map((c: any) => (
              <div key={c.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{c.booking?.tour?.title}</p>
                  <p className="text-gray-400 text-xs">{c.booking?.user?.name} · {new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900">{formatPrice(c.amount)}</p>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                </div>
              </div>
            ))}
            {commissions.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No commissions yet. Start sharing your referral code!</p>}
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Referrals</h2>
            <a href="/agent/referrals" className="text-secondary text-xs font-semibold hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {referrals.slice(0, 5).map((r: any) => (
              <div key={r.id} className="flex items-center gap-3 px-6 py-4">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                  {r.agent?.user?.name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{r.agent?.user?.name}</p>
                  <p className="text-gray-400 text-xs">{r.agent?.user?.email}</p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Referred
                </div>
              </div>
            ))}
            {referrals.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No referrals yet. Share your code to get started!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
