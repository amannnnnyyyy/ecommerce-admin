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

import { BillboardColumn, columns } from "./columns"


interface BillboardClientProps{
  data:BillboardColumn[]
}

const BillboardClient:React.FC<BillboardClientProps> = ({
  data
}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Billboard (${data.length})`} description={"Manage billboards for your store"}/>
    
            <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}></DataTable>
        <Heading title={`API`} description={'API calls for Billboards'}/>
        <Separator/>
        <ApiList entityName={"billboards"} entityIdName={"billboardsId"}/>
    </>
  )
}

export default BillboardClient