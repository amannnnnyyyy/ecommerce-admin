"use client"

//global imports
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

//local imports
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

import { ProductColumn, columns } from "./columns"


interface ProductClientProps{
  data:ProductColumn[]
}

const ProductClient:React.FC<ProductClientProps> = ({
  data
}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Client (${data.length})`} description={"Manage products for your store"}/>
    
            <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}></DataTable>
        <Heading title={`API`} description={'API calls for Products'}/>
        <Separator/>
        <ApiList entityName={"products"} entityIdName={"productssId"}/>
    </>
  )
}

export default ProductClient