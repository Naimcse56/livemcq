import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CreateEmployee from "@/components/employee/createEmployee"
import EmployeeList from "@/components/employee/employeeList"
import type { Employee } from "@/components/employee/employeeList"

export default function EmployeePage() {
  const [isManage, setIsManage] = useState(false)

  // Dummy Data (Later API দিয়ে replace করবে)
  
  const [employees] = useState<Employee[]>([
    { id: 1, name: "Naimul Islam", email: "naimul@example.com", mobile: "01700000001", status: "active" },
    { id: 2, name: "John Doe", email: "john@example.com", mobile: "01700000002", status: "inactive" },
    { id: 3, name: "Sarah Khan", email: "sarah@example.com", mobile: "01700000003", status: "active" },
    { id: 4, name: "Michael Smith", email: "michael@example.com", mobile: "01700000004", status: "active" },
    { id: 5, name: "Ayesha Rahman", email: "ayesha@example.com", mobile: "01700000005", status: "inactive" },
    { id: 6, name: "David Lee", email: "david@example.com", mobile: "01700000006", status: "active" },
    { id: 7, name: "Emma Watson", email: "emma@example.com", mobile: "01700000007", status: "active" },
    { id: 8, name: "Hasan Mahmud", email: "hasan@example.com", mobile: "01700000008", status: "inactive" },
    { id: 9, name: "Olivia Brown", email: "olivia@example.com", mobile: "01700000009", status: "active" },
    { id: 10, name: "William Clark", email: "william@example.com", mobile: "01700000010", status: "active" },
    { id: 11, name: "Sophia Turner", email: "sophia@example.com", mobile: "01700000011", status: "inactive" },
    { id: 12, name: "Liam Wilson", email: "liam@example.com", mobile: "01700000012", status: "active" },
    { id: 13, name: "Isabella Taylor", email: "isabella@example.com", mobile: "01700000013", status: "active" },
    { id: 14, name: "Noah Anderson", email: "noah@example.com", mobile: "01700000014", status: "inactive" },
    { id: 15, name: "Mia Thomas", email: "mia@example.com", mobile: "01700000015", status: "active" },
  ])

  return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
              <div className="p-6 space-y-6">
                {/* Top Section */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Employee List</h2>

                  <Button onClick={() => setIsManage(true)}>
                    Add Employee
                  </Button>
                </div>

                {/* Table Section */}
                <EmployeeList data={employees} />

                {/* Create Modal */}
                <CreateEmployee
                  isOpen={isManage}
                  onOpenChange={setIsManage}
                />
              </div>
        </SidebarInset>
      </SidebarProvider>
  )
}