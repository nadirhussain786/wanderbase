import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: { template: "%s | Admin — WanderBase", default: "Admin — WanderBase" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
