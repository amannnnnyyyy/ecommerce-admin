"use client"

//global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client"
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



interface SettingsFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm:React.FC<SettingsFormProps> = ({initialData}) => {

    const params = useParams()
    const router = useRouter()

    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData
    })

    const onSubmit = async (data:SettingsFormValues)=>{
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
                title="settings"
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
        <ApiAlert title={"test"} description={"test"} variant={"public"}/>
    </div>
  )
}

export default SettingsForm