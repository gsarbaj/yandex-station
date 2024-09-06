"use server";

import {db} from "@/db";
import {lucia} from "@/auth/auth";
import {cookies} from "next/headers";
import {Session} from "lucia";
import * as argon2 from "argon2";
import {RegisterSchema} from "@/schema";
import {z} from "zod";

interface UserData {
    id: string;
    email: string;
    password_hash: string;
    sessions?: Session[];
}

export const signUp = async (data: z.infer<typeof RegisterSchema>) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
        // throw new Error(
        //   "Invalid login credentials. Please check your email and password",
        // );

        // console.log('')
        // console.error('LOGIN ERROR', 'Invalid login credentials. Please check your email and password')
        // console.log('')
        return {error: 'Invalid login credentials. Please check your email and password', success: false}
    }

    const email: string = data.email as string;
    const password: string = data.password as string;

    try {
        const user = await db.user.findUnique({
            where: {email: email},
        });

        if (user) {
            // throw new Error(
            //   "Invalid login credentials. Please check your email and password",
            // );

            // console.log('')
            // console.error('LOGIN ERROR', 'Invalid login credentials. Please check your email and password')
            // console.log('')
            return {error: 'Invalid login credentials. Please check your email and password', success: false}

        }

        if (!user) {
            const password_hash = await argon2.hash(password);
            const user = await db.user.create({
                data: {
                    email: email,
                    password_hash: password_hash,
                },
            });

            const session = await lucia.createSession(user?.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            console.log(sessionCookie.name, '  ', sessionCookie.attributes)

            return {success: true};
        }
    } catch (error) {
        console.error("ERROR", error);
        return {error: 'Invalid login credentials. Please check your email and password', success: false}
    } finally {
    }
};

// created on 15/08/2024 11:25§ §