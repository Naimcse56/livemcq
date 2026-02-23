import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface ManageProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type Role = "Staff" | "Teacher" | "Admin" | "Student" | "Guest"
type Gender = "male" | "female"

interface FormValues {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  mobile: string
  dateOfJoin: string
  nidNumber: string
  gender: Gender
  role: Role
}

// Yup schema
const schema: yup.ObjectSchema<FormValues> = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Only numbers allowed")
    .min(10, "Minimum 10 digits")
    .required("Mobile is required"),
  dateOfJoin: yup.string().required("Date of Join is required"),
  nidNumber: yup.string().required("NID Number is required"),
  gender: yup
    .mixed<Gender>()
    .oneOf(["male", "female"])
    .required("Gender is required"),
  role: yup
    .mixed<Role>()
    .oneOf(["Staff", "Teacher", "Admin", "Student", "Guest"])
    .required("Role is required"),
})

export default function CreateEmployee({ isOpen, onOpenChange }: ManageProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log("Employee Data:", data)
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-screen sm:max-w-lg">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Create Employee</SheetTitle>
          <SheetDescription>Fill the information below to create a new employee.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex overflow-y-auto flex-col flex-1">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-5">

              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input {...register("fullName")} placeholder="Enter full name" />
                <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" {...register("email")} placeholder="Enter email" />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" {...register("password")} placeholder="Enter password" />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>Mobile</Label>
                <Input {...register("mobile")} placeholder="Enter mobile number" />
                <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>Date of Join</Label>
                <Input type="date" {...register("dateOfJoin")} />
                <p className="text-red-500 text-sm">{errors.dateOfJoin?.message}</p>
              </div>

              <div className="grid gap-2">
                <Label>NID Number</Label>
                <Input {...register("nidNumber")} placeholder="Enter NID number" />
                <p className="text-red-500 text-sm">{errors.nidNumber?.message}</p>
              </div>

              {/* ShadCN Select for Gender */}
              <div className="grid gap-2">
                <Label>Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-red-500 text-sm">{errors.gender?.message}</p>
              </div>

              {/* ShadCN Select for Role */}
              <div className="grid gap-2">
                <Label>Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-red-500 text-sm">{errors.role?.message}</p>
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