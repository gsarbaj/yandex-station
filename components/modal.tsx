import React from "react";
import {useRouter, useSearchParams} from "next/navigation";


interface ModalProps {
    children: React.ReactNode,
    modalId: string
}

export function Modal({children, modalId}: ModalProps){

    const router = useRouter()

    const searchParams = useSearchParams()
    let open: boolean = false;

    if (searchParams.get(`${modalId}`) === "open") {
       open = true
        // document.body.classList.add("overflow-y-hidden")
    } else {
        // document.body.classList.remove("overflow-y-hidden")
    }


    return (
        // @ts-ignore
        <div onClick={()=> router.push(`?${modalId}=close`)} className={`fixed inset-0 flex justify-center items-center transition-colors z-20
                        ${open? "visible bg-black/80" : "invisible"}
        `}>
            <div  onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 transition-all 
            ${open? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>


            {children}

            </div>
        </div>
    )
}