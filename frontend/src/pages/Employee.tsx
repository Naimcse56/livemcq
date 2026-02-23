import CreateEmployee from "@/components/employee/createEmployee"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function EmployeePage() {
  const [isManage, setIsManage] = useState(false)

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Button onClick={() => setIsManage(true)}>Add Employee</Button>
        <CreateEmployee isOpen={isManage} onOpenChange={setIsManage}/>
      </div>
    </div>
  )
}
