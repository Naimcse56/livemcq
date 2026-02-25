
import { Toaster } from "react-hot-toast";
import AppRoutes from "@/routes"

export default function Page() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  )
}
