"use client"

//global imports
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

//loacl imports
import { Button } from "@/components/ui/button"
import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  label: string
  billboardLabel: string,
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Label
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Billboard
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell:({row})=>row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: "actions",
    cell:({row})=><CellAction data={row.original}/>
  },
]
