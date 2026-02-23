import { Routes, Route } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import Employee from "@/pages/Employee"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employee-details" element={<Employee />} />
    </Routes>
  )
}