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

import { OrderColumn, columns } from "./columns"


interface OrderClientProps{
  data:OrderColumn[]
}

const OrderClient:React.FC<OrderClientProps> = ({
  data
}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <Heading title={`Orders (${data.length})`} description={"Manage orders for your store"}/>
        <Separator/>
        <DataTable searchKey="products" columns={columns} data={data}></DataTable>
    </>
  )
}

export default OrderClient