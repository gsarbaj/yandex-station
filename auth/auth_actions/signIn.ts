"use server";

import {db} from "@/db";
import {lucia} from "@/auth/auth";
import {cookies} from "next/headers";
import {toast} from 'sonner';
import {redirect} from "next/navigation";
import {Session} from "lucia";
import * as argon2 from "argon2";
import {LoginSchema} from "@/schema";
import {z} from "zod";

interface UserData {
    id: string;
    email: string;
    password_hash: string;
    sessions?: Session[];
}

export const signIn = async (data: z.infer<typeof LoginSchema>) => {
    const email: string = data.email as string;
    const password: string = data.password as string;

    try {
        const user = await db.user.findUnique({
            where: {email: email},
        });

        if (!user) {
            console.log('')
            console.error('LOGIN ERROR', 'Invalid login credentials. Please check your email and password')
            console.log('')
            return {error: 'Invalid login credentials. Please check your email and password', success: false}
        }

        if (user) {
            const confirmLogin = await argon2.verify(user.password_hash, password);

            if (confirmLogin) {
                const session = await lucia.createSession(user.id, {});
                const sessionCookie = lucia.createSessionCookie(session.id);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );

                return {success: true};

            } else {
                console.error('LOGIN ERROR', 'Invalid login credentials. Please check your email and password')
                return {error: 'Invalid login credentials. Please check your email and password', success: false}
            }
        }
    } catch (error) {
        console.error("ERROR", error);
        return {error: 'Invalid login credentials. Please check your email and password', success: false}
    } finally {

    }
};

// created on 15/08/2024 11:25
