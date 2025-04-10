"use client"

//global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface CategoryFormProps{
    initialData: Category | null;
    billboards: Billboard[];
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm:React.FC<CategoryFormProps> = ({initialData, billboards}) => {

    const params = useParams()
    const router = useRouter()

    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const title  = initialData ? "Edit Category" : "Create Category"
    const description  = initialData ? "Edit Category" : "Add a new Category"
    const toastMessage  = initialData ? "Category updated" : "Category created"
    const action  = initialData ? "Save Changes" : "Create"


    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            name : "",
            billboardId : "",
        }
    })

    const onSubmit = async (data:CategoryFormValues)=>{
        try {
            setLoading(true);
            if(initialData)
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`,data)
            else
                await axios.post(`/api/${params.storeId}/categories`,data)

            router.refresh()
            router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category deleted successfully")
        } catch (error) {
            toast.error("Make sure you deleted all the products using this category first!")
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
                                        placeholder="Category Name"
                                        {...field}
                                        className="w-full"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem className="w-44 sm:w-60 md:w-full">
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

export default CategoryForm