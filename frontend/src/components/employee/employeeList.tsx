import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type Employee = {
  id: number
  name: string
  email: string
  mobile: string
  status: "active" | "inactive"
}

interface EmployeeListProps {
  data: Employee[]
}

export default function EmployeeList({ data }: EmployeeListProps) {
    const [globalFilter, setGlobalFilter] = React.useState("")

    const columns: ColumnDef<Employee>[] = [
    {
        id: "serial",
        header: "#",
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination

            // Safety: ensure pageSize is not 0
            const size = pageSize || 10
            return pageIndex * size + row.index + 1
        },
    },

    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email", 
        cell: ({ getValue }) => (
            <span className="cursor-pointer">{getValue<string>()}</span>
        ),
    },
    { accessorKey: "mobile", header: "Mobile" },
    {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
        <Badge variant={status === "active" ? "default" : "destructive"} className="capitalize">
            {status}
        </Badge>
        )
    },
    },
    {
    id: "actions",
    header: "Action",
    cell: () => (
        <div className="flex gap-2">
        <Button size="sm" variant="outline" className="cursor-pointer">
            Edit
        </Button>
        <Button size="sm" variant="destructive" className="cursor-pointer">
            Delete
        </Button>
        </div>
    ),
    },
    ]

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full space-y-4">
      {/* Search */}
      <Input
        placeholder="Search employee..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}