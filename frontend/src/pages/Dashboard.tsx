import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Dashboard() {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h3>Dashboard Page</h3>
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}
