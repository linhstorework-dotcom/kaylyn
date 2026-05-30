import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { SidebarProvider } from "@/components/admin/SidebarProvider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>

      <AdminSidebar />

      <div className="md:ml-64 min-h-screen bg-gray-100 flex flex-col">

        <AdminHeader />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </SidebarProvider>
  )
}