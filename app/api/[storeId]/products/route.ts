import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}:{params:{ storeId : string}}){ 
    try {
        const body = await req.json();

        const {userId} = await auth();
        const {name, price, categoryId, colorId, sizeId, isFeatured, isArchived, images} = body;
        
        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!name) return new NextResponse("Name is required",{status: 400})
        if(!price) return new NextResponse("Price is required",{status:  400})
        if(!categoryId) return new NextResponse("CategoryId is required",{status:400})
        if(!colorId) return new NextResponse("ColorId is required",{status:400})
        if(!sizeId) return new NextResponse("SizeID is required",{status:400})
        if(!images || !images.length) return new NextResponse("Images are required",{status:400})

        if(!params.storeId)
            return new NextResponse("Store id is required", { status: 400});

        const storeByUserId = await prismadb.store.findFirst(
            {
                where:{
                    id: params.storeId,
                    userId
                }
            }
        )

        if(!storeByUserId) return new NextResponse("Unauthorized",{status: 401})


        const product = await prismadb.product.create({
            data: { 
                name,
                price, 
                isFeatured, 
                isArchived, 
                categoryId, 
                colorId, 
                sizeId, 
                images:{
                 createMany: {
                    data: [
                        ...images.map((image: {url:string})=>image)
                    ]
                 }
                }, 
                storeId: params.storeId }
        });
            
        
        return NextResponse.json(product,{status: 201})
    } catch (error) {
        console.log('[PRODUCTS_POST]',error);
        return new NextResponse("Internal Server Error",{status: 500})
    }
}




export async function GET(req: Request, {params}:{params:{ storeId : string}}){    
    try {
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const isFeatured = searchParams.get('isFeatured')



        if(!params.storeId)
            return new NextResponse("Store id is required", { status: 400 });

        const products = await prismadb.product.findMany({
           where: {
            storeId: params.storeId,
            categoryId,
            colorId,
            sizeId,
            isFeatured: isFeatured? true: undefined,
            isArchived: false
        },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
            
        
        return NextResponse.json(products,{status:201})
    } catch (error) {
        console.log('[PRODUCTS_GET]',error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}