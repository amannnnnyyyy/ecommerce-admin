"use client"

//global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

//local imports
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";



interface BillboardsFormProps{
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardsFormValues = z.infer<typeof formSchema>;

const BillboardsForm:React.FC<BillboardsFormProps> = ({initialData}) => {

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const form = useForm<BillboardsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            label : "",
            imageUrl : "",

        }
    })

    const onSubmit = async (data:BillboardsFormValues)=>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`,data)
            router.refresh()
            toast.success("store updated.")
        } catch (error) {
            toast.error("something went wrong!");
        }finally{
            setLoading(false)
        }
    }


    const onDelete = async ()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success("store deleted successfully")
        } catch (error) {
            toast.error("Make sure you removed all products and categories first!")
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }


  return (
    <div className="mx-5 border-l border-t border-blue-400 p-4 shadow-md">
        <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
        <div className="flex items-center justify-between">
            <Heading
                title="Billboards"
                description="Manage store preferences"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={()=>setOpen(true)}
                    >
                        <Trash className="h-4 w-4"/>
                </Button>
        </div>
        <Separator className="my-4"/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control} 
                        name="name"
                        render={({field})=>(
                            <FormItem className="w-44 sm:w-60 md:w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="Store name"
                                        {...field}
                                        className="w-full"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                </div>
                <Button 
                    disabled={loading}
                    className="ml-auto"
                    type="submit">
                        Save Changes
                </Button>
            </form>
        </Form>
        <Separator className="my-4"/>
        <ApiAlert title={"NEXT_PUBLIC_API_URL"} description={`${origin}/api/${params.storeId}`} variant={"public"}/>
    </div>
  )
}

export default BillboardsForm