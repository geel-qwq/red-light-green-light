import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClientNavMenu from "@/components/ClientNavMenu";
import LocationDisplay from "@/components/LocationDisplay";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col justify-between">
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
