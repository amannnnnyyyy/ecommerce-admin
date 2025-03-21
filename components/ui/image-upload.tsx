"use client"
//global imports
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget} from "next-cloudinary"

//local imports
import { Button } from "@/components/ui/button";

interface ImageUploadProps{
    disabled: boolean;
    onChange: (value:string)=>void;
    onRemove: (value:string)=>void;
    value: string[]
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const onUpload=(result:any)=>{
        onChange(result.info.secure_url);
    }

    if(!isMounted) return null
    

  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {value.map((url)=>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={()=>onRemove(url)} variant="destructive" size="icon">
                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>
                    <Image fill className="object-cover" src={url} alt={"image"} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"/>
                </div>
            ))}
        </div>
        <CldUploadWidget onSuccess={onUpload} uploadPreset="AfricanBraids">
            {({open})=>{
                const onClick = () => {
                    open()
                }
                return (
                    <Button 
                        type="button"
                        disabled={disabled} 
                        onClick={onClick} 
                        variant="secondary">
                        <ImagePlus className="h-4 w-4 mr-2"/>
                        Upload an image
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload