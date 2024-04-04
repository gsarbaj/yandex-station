'use client'


import {useSession} from "next-auth/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import * as actions from "@/actions/index"

const SignInButton = () => {

    const {data: session} = useSession()

    return (
        <div className={'flex items-center gap-2'}>
            {session && session.user?
                <>
            <p>{session.user.email}</p>
                    <Button onClick={() => {actions.SignOut().finally()}}>Sign out</Button>
                </> : <>
                <Link href={'/api/auth/_signin'}>Sign In</Link>
                </>
            }
        </div>
    );
};

export default SignInButton;