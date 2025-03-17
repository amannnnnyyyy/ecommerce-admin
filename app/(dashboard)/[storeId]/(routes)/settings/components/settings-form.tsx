"use client"

//global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

//local imports
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface SettingsFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm:React.FC<SettingsFormProps> = ({initialData}) => {

    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData
    })

    const onSubmit = async (data:SettingsFormValues)=>{
        console.log("submitted",data)
    }


  return (
    <>
        <div className="flex items-center justify-between">
            <Heading
                title="settings"
                description="Manage store preferences"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={()=>{}}
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
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input/>
                                </FormControl>
                            </FormItem>
                        )}/>
                </div>
            </form>
        </Form>
    </>
  )
}

export default SettingsForm