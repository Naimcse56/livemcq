import { Routes, Route } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import Employee from "@/pages/Employee"
import Login from "@/pages/Auth/Login"
// import Register from "@/pages/Auth/Register"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/sign-up" element={<Register />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employee-details" element={<Employee />} />
    </Routes>
  )
}