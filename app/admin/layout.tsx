import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import Navbar from "@/components/layouts/admin/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative bg-gray-50">
      {/* Sidebar (Hidden on mobile, Fixed on Desktop) */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-72 h-full flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
