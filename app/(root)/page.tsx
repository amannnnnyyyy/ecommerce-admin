"use client"
import { useStoreModal } from "@/hooks/use-store-modal";
import {useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect} from "react";


export default function SetUpPage() {
  const {isSignedIn} = useUser();
  useEffect(() => {
    if (!isSignedIn) {
      redirect('/sign-in');
    }
  }, [isSignedIn]);
  
  
  const onOpen = useStoreModal((state)=>state.onOpen);
  const isOpen = useStoreModal((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen,onOpen])

  return (
    <div> 
      Root Page
    </div>
  );
}
