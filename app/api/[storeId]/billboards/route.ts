import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}:{params:{ storeId : string}}){    
    try {
        const body = await req.json();

        const {userId} = await auth();
        const {label, imageUrl} = body;
        
        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!label) return new NextResponse("Label is required",{status:400})
        if(!imageUrl) return new NextResponse("Image is required",{status:400})

        if(!params.storeId)
            return new NextResponse("Store id is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst(
            {
                where:{
                    id: params.storeId,
                    userId
                }
            }
        )

        if(!storeByUserId) return new NextResponse("Unauthorized",{status: 401})


        const billboard = await prismadb.billboard.create({
            data: { label,imageUrl, storeId: params.storeId }
        });

        if (billboard) {
            return new NextResponse("Store name already exists", { status: 400 });
        }
            
        
        return NextResponse.json(billboard,{status:201})
    } catch (error) {
        console.log('[BILLBOARDS_POST]',error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}




export async function GET(req: Request, {params}:{params:{ storeId : string}}){    
    try {
        if(!params.storeId)
            return new NextResponse("Store id is required", { status: 400 });

        const billboards = await prismadb.billboard.findMany({
           where: {storeId: params.storeId},
        });
            
        
        return NextResponse.json(billboards,{status:201})
    } catch (error) {
        console.log('[BILLBOARDS_GET]',error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}