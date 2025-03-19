"use client"

//global import
import { Copy, CopyCheck, Server } from "lucide-react";
import toast from "react-hot-toast";

//local import
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ApiAlertProps{
    title:string;
    description:string;
    variant:"public"|"admin";
};
const textMap:Record<ApiAlertProps["variant"],string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap:Record<ApiAlertProps["variant"],BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}


const ApiAlert:React.FC<ApiAlertProps> = ({
    title,
    description,
    variant="public"
}) => {

    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        // toast.success("Api Route copied to clipboard.")

    }

  return (
    <Alert>
        <Server className="h-4 w-4"/>
        <AlertTitle className="flex items-center gap-x-2 flex-col md:flex-row break-all">
            {title}
            <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all">
                {description}
            </code>
            <Button variant="outline" size="icon" onClick={onCopy}>
                {copied?<CopyCheck className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}
            </Button>
                {copied&&<h3 className="absolute right-4 top-4">Copied</h3>}
        </AlertDescription>
    </Alert>
  )
}

export default ApiAlert