"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"

const formSchema = z.object({
        name: z.string().min(1),
    })
export const StoreModal = () =>{
    const storeModal = useStoreModal()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
        }
    });

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        console.log(values)
    }

  return(  
    <Modal title="Create Store"
        description="You must add a new store before continuing"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
            <div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            <FormField control={form.control}
                                       name="name"
                                       render={({field})=>(
                                        <FormItem>
                                            <FormLabel> Name </FormLabel>
                                            <FormControl>
                                                <input className="ml-5 w-full border-2 border-opacity-30 border-slate-500" placeholder="E-commerce" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                        
                                       )}>

                            </FormField>
                           <div className="flex gap-5">
                                <Button type="button" className="bottom-0 self-center w-2/3 hover:bg-red-800" onSubmit={storeModal.onClose}>Cancel</Button>
                                <Button type="submit" className="bottom-0 self-center w-2/3 hover:bg-green-800">Create</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        {/* <Button onClick={()=>}>Future Create Store Form</Button> */}
    </Modal>
        )
}