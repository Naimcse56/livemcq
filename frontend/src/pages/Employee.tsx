import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import CreateEmployee from "@/components/employee/createEmployee"
import EmployeeList from "@/components/employee/employeeList"
import type { Employee } from "@/components/employee/employeeList"
import axios from "axios"

export default function EmployeePage() {
  const [isManage, setIsManage] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setEmployees(res.data.data)
    } catch (error) {
      console.error("Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }
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