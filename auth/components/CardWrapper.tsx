'use client'

import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import AuthHeader from "@/auth/components/AuthHeader";
import BackButton from "@/auth/components/BackButton";

interface CardWrapperProps {
    label: string
    title: string
    backButtonHref: string
    backButtonLabel: string
    children: React.ReactNode
}

const CardWrapper = ({label, title, backButtonHref, backButtonLabel, children}: CardWrapperProps) => {

    return (
        <Card className={'xl:w-1/4 md:w-1/2'}>
           <CardHeader>
               <AuthHeader label={label} title={title}/>
           </CardHeader>
           <CardContent>
               {children}
           </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>



        </Card>
    );
};

export default CardWrapper;


// created on 21/08/2024 18:49