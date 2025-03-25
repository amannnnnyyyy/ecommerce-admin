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

import { ColorColumn, columns } from "./columns"


interface ColorClientProps{
  data:ColorColumn[]
}

const ColorClient:React.FC<ColorClientProps> = ({
  data
}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Colors (${data.length})`} description={"Manage colors for your store"}/>
    
            <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="mr-2 w-4 h-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}></DataTable>
        <Heading title={`API`} description={'API calls for Colors'}/>
        <Separator/>
        <ApiList entityName={"colors"} entityIdName={"colorsId"}/>
    </>
  )
}

export default ColorClient