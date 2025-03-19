"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns"

interface CellActionProps{
    data:BillboardColumn;
}

export const CellAction:React.FC<CellActionProps> =({data}) =>{
    return(
       <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-300 border-spacing-4 border-gray-400 rounded-lg p-1 px-3">
            <span className="text-black">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}