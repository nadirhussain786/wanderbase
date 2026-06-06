import AgentSidebar from "@/components/agent/AgentSidebar";

export const metadata = { title: { template: "%s | Agent — WanderBase", default: "Agent Portal — WanderBase" } };

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <AgentSidebar />
      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  );
}
