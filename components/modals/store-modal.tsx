"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
        name: z.string().nonempty("Name is required!").min(2,"Name should be more than 1 character"),
    })
export const StoreModal = () =>{
    const storeModal = useStoreModal()
    
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
        }
    });

    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try{
            setLoading(true)
            const response = await fetch('/api/stores', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(values), 
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            toast.success("store created successfully")
        }catch(error:any){
            if (error.response?.status === 400 && error.response?.data === "Store name already exists") {
                toast.error("Store already exists. Please choose a different name.");
            } else {
                console.log("Store name already exists. Please choose a different name")
                toast.error("Something went wrong");
            }
        }finally{
            setLoading(false)
        }
    }

  return(  
    <Modal title="Create Store"
        description="Enter your store name to create a new store"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
           <div className="flex flex-col md:flex-row">
                <img className="top-0 h-36 w-36 self-center" src="emptyStore.png" alt="" />
                <div>
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center drop-shadow-lg">
                    You have no store 🛒🚫
                </h1>

                <p className="mt-4 text-lg text-gray-500 text-center px-6 max-w-2xl mx-auto leading-relaxed">
                    You must have atleast one store to continue
                </p>
                </div>
           </div>
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
                                                <input disabled={loading} className="ml-5 w-full border-2 border-opacity-30 border-slate-500" placeholder="E-commerce" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                        
                                       )}>

                            </FormField>
                           <div className="flex gap-5">
                                <Button disabled={loading} type="button" className="bg-secondary bottom-0 self-center w-2/3 hover:bg-red-800 text-black hover:text-white" onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit" className="bottom-0 self-center w-2/3 hover:bg-green-800">Create</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
    </Modal>
        )
}