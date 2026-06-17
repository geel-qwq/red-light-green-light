import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClientNavMenu from "@/components/ClientNavMenu";
import LocationDisplay from "@/components/LocationDisplay";
import MobileSidebarToggle from "@/components/MobileSidebarToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <MobileSidebarToggle />

      {/* Sidebar */}
      <aside id="dashboard-sidebar" className="fixed -translate-x-full md:relative md:translate-x-0 w-72 md:w-56 bg-white border-r border-gray-100 flex flex-col justify-between z-40 transition-transform duration-200 md:min-h-screen">
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 tracking-wider">
              il<span className="text-xs font-semibold text-yellow-500  tracking-wider">LUMEN</span>ate
            </p>
            <LocationDisplay />
          </div>

          {/* Role-aware nav */}
          <ClientNavMenu
            userRole={(session.user as any).role}
            userName={session.user?.name ?? "User"}
          />
        </div>
      </aside>

      {/* Mobile overlay */}
      <div id="sidebar-overlay" className="fixed inset-0 bg-black/30 z-30 hidden md:hidden" />

      {/* Main content */}
      <main id="main-content" className="flex-1 overflow-auto min-w-0">{children}</main>
    </div>
  );
}
