"use client"

import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/modal";

interface AlertModalProps{
    isOpen: boolean,
    onClose: ()=>void,
    onConfirm: ()=>void,
    loading:boolean
}
const AlertModal:React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
  return (
    <Modal title={"Are you sure?"} description={"You will not get thid data back after deleting."} isOpen={isOpen} onClose={onClose}>
        <div>

        </div>
    </Modal>
  )
}

export default AlertModal