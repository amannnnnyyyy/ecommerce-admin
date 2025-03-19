"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { BillboardColumn } from "./columns"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps{
    data:BillboardColumn;
}

export const CellAction:React.FC<CellActionProps> =({data}) =>{
    const router = useRouter()
    const params = useParams()
    const onCopy = (text:string) =>{
        console.log("copying")
        navigator.clipboard.writeText(text)
        toast.success("Billboard Id copied to clipboard")
    }
    return(
       <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-blue-50 border-spacing-4 border-gray-400 rounded-lg p-1 px-3">
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>            
            <DropdownMenuItem  onClick={()=>onCopy(data.id)}><Copy className="mr-2 h-4 w-4"/>Copy id</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}><Edit className="mr-2 h-4 w-4 text-blue-600"/>Update</DropdownMenuItem>
            <DropdownMenuItem><Trash className="mr-2 h-4 w-4 text-red-500"/>Delete</DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}