import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
// import Navbar from "@/components/layouts/admin/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative bg-slate-50">
      {/* 1. Desktop Sidebar */}
      {/* Hidden on mobile (hidden), Fixed on desktop (md:flex), Width 72 */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <AdminSidebar />
      </div>

      {/* 2. Main Content Area */}
      {/* Pushed to right by 72 (md:pl-72) to make room for sidebar */}
      <main className="md:pl-72 h-full flex flex-col min-h-screen">
        {/* <Navbar /> */}

        {/* Render the specific page content here */}
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
