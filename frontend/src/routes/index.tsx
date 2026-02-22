import { Routes, Route } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import AccordionPage from "@/pages/AccordionPage"
import CarouselPage from "@/pages/CarouselPage"
import DrawerPage from "@/pages/DrawerPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/accordion" element={<AccordionPage />} />
      <Route path="/carousel" element={<CarouselPage />} />
      <Route path="/drawer" element={<DrawerPage />} />
    </Routes>
  )
}