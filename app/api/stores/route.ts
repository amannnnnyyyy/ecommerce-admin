import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){    
    try {
        const body = await req.json();

        const {userId} = await auth();
        const {name} = body;
        
        if(!userId) return new NextResponse("Unauthorized",{status: 401})
        if(!name) return new NextResponse("Name is required",{status:400})
        const existingStore = await prismadb.store.findUnique({
            where: { name }
        });
        if (existingStore) {
            return new NextResponse("Store name already exists", { status: 400 });
        }
            
        
        const store = await prismadb.store.create({
                data: {
                    name,
                    userId
                }
            });
            return NextResponse.json(store,{status:201})
    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}