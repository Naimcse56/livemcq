import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"


interface ManageProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function CreateEmployee({isOpen, onOpenChange} : ManageProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-screen sm:max-w-lg">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Create Employee</SheetTitle>
          <SheetDescription>Fill the information below to create a new employee.</SheetDescription>
        </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Enter full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" required />
              </div>
            </div>
          </div>

          <SheetFooter className="px-4 pb-4 border-t">
            <Button type="submit" className="w-full">Save Employee</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full">Cancel</Button>
            </SheetClose>
          </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}