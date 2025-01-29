"use client"
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {UserButton, UserProfile, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


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
