'use server'

import {validateRequest} from "@/auth/auth";
import {redirect} from "next/navigation";

export const protectRoute = async () => {
    const {user} = await validateRequest()

    if (!user) {
        // console.error('REDIRECT')
        return redirect('/login')
    }
}


// created on 01/09/2024 16:25