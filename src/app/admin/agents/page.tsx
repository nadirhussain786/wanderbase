"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, DollarSign, Users, Link2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  ACTIVE:    { color: "bg-green-100 text-green-700",  icon: CheckCircle, label: "Active"    },
  PENDING:   { color: "bg-amber-100 text-amber-700",  icon: Clock,       label: "Pending"   },
  SUSPENDED: { color: "bg-red-100   text-red-600",    icon: XCircle,     label: "Suspended" },
};

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/admin/agents").then((r) => r.json()).then(setAgents).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const updateAgent = async (id: string, patch: object) => {
    await fetch("/api/admin/agents", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
    toast.success("Agent updated");
    load();
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage travel agents, commissions, and approval status.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-5 mb-7">
        {[
          { label: "Total Agents", value: agents.length, icon: Users, color: "from-blue-500 to-cyan-500" },
          { label: "Active Agents", value: agents.filter((a) => a.status === "ACTIVE").length, icon: CheckCircle, color: "from-green-500 to-emerald-500" },
          { label: "Pending Approval", value: agents.filter((a) => a.status === "PENDING").length, icon: Clock, color: "from-amber-400 to-orange-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 bg-linear-to-br ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-gray-500 text-xs font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : agents.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No agents yet</p>
        ) : agents.map((agent, i) => {
          const sc = statusConfig[agent.status] ?? statusConfig.PENDING;
          const StatusIcon = sc.icon;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* Avatar + info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                    {agent.user?.avatar ? <img src={agent.user.avatar} alt="" className="w-full h-full object-cover" /> : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">{agent.user?.name?.[0]}</div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <p className="font-bold text-gray-900">{agent.user?.name}</p>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" /> {sc.label}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{agent.user?.email}</p>
                    {agent.companyName && <p className="text-primary text-xs font-medium mt-0.5">{agent.companyName}</p>}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-green-600 mb-0.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span className="font-bold text-sm">{formatPrice(agent.totalEarnings)}</span>
                    </div>
                    <p className="text-gray-400 text-[11px]">Total Earned</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 mb-0.5">{agent._count?.referrals ?? 0}</p>
                    <p className="text-gray-400 text-[11px]">Referrals</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 mb-0.5">{agent.commissionRate}%</p>
                    <p className="text-gray-400 text-[11px]">Commission</p>
                  </div>
                </div>

                {/* Referral code */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 shrink-0">
                  <Link2 className="w-3.5 h-3.5" />
                  {agent.referralCode}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  {agent.status === "PENDING" && (
                    <button onClick={() => updateAgent(agent.id, { status: "ACTIVE" })} className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                  )}
                  {agent.status === "ACTIVE" && (
                    <button onClick={() => updateAgent(agent.id, { status: "SUSPENDED" })} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-200">
                      Suspend
                    </button>
                  )}
                  {agent.status === "SUSPENDED" && (
                    <button onClick={() => updateAgent(agent.id, { status: "ACTIVE" })} className="px-4 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-xl hover:bg-green-100 transition-colors border border-green-200">
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
