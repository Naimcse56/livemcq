import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import AppRoutes from "@/routes"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <AppRoutes />
      </SidebarInset>
    </SidebarProvider>
  )
}
