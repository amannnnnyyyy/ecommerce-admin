"use client"

//global imports
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

//local imports
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";

   //local relative
import { ProductColumn } from "./columns"


interface CellActionProps{
    data:ProductColumn;
}

export const CellAction:React.FC<CellActionProps> =({data}) =>{
    const router = useRouter()
    const params = useParams()

    const [loading,setLoading] = useState(false)
    const [open,setOpen]=useState(false)

    const onCopy = (text:string) =>{
        navigator.clipboard.writeText(text)
        toast.success("Product Id copied to clipboard")
    }

    const onDelete = async ()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${data.id}`)
            router.refresh()
            toast.success("Product deleted successfully")
        } catch (error) {
            toast.error("Something went wrong!")
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return(
       <>
        <AlertModal 
            isOpen={open}
            onClose={()=>setOpen(false)}
            onConfirm={onDelete}
            loading={loading}/>
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
                <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/products/${data.id}`)}><Edit className="mr-2 h-4 w-4 text-blue-600"/>Update</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}><Trash className="mr-2 h-4 w-4 text-red-500"/>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
    )
}