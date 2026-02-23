import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CreateEmployee() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Employee</Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-screen sm:max-w-lg">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Create Employee</SheetTitle>
          <SheetDescription>Fill the information below to create a new employee.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex  overflow-y-auto flex-col flex-1">
          <div className="flex-1 px-4 py-4">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email address" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
              </div>
            </div>
          </div>

          <SheetFooter className="px-4 pb-4 border-t">
            <Button type="submit" className="w-full">Save Employee</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}