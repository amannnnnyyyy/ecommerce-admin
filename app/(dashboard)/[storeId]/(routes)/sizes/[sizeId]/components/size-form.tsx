"use client"

//global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client"
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
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";



interface SizesFormProps{
    initialData: Size | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizesFormValues = z.infer<typeof formSchema>;

const SizesForm:React.FC<SizesFormProps> = ({initialData}) => {

    const params = useParams()
    const router = useRouter()

    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const title  = initialData ? "Edit Size" : "Create Size"
    const description  = initialData ? "Edit Size" : "Add a new Size"
    const toastMessage  = initialData ? "Size updated" : "Size created"
    const action  = initialData ? "Save Changes" : "Create"


    const form = useForm<SizesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            name : "",
            value : "",
        }
    })

    const onSubmit = async (data:SizesFormValues)=>{
        try {
            setLoading(true);
            if(initialData)
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            else
                await axios.post(`/api/${params.storeId}/sizes`,data)

            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("something went wrong!");
        }finally{
            setLoading(false)
        }
    }


    const onDelete = async ()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size deleted successfully")
        } catch (error) {
            toast.error("Make sure you removed all products using this size first!")
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
                title={title}
                description={description}
                />
                {initialData&&(
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={()=>setOpen(true)}
                    >
                        <Trash className="h-4 w-4"/>
                </Button>
            )}
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
                                        placeholder="Size name..."
                                        {...field}
                                        className="w-full"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control} 
                        name="value"
                        render={({field})=>(
                            <FormItem className="w-44 sm:w-60 md:w-full">
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="Size value..."
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
                        {action}
                </Button>
            </form>
        </Form>
        <Separator className="my-4"/>
        {/* <ApiAlert title={"NEXT_PUBLIC_API_URL"} description={`${origin}/api/${params.storeId}`} variant={"public"}/> */}
    </div>
  )
}

export default SizesForm