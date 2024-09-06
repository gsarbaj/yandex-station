import {Lucia, Session} from "lucia";
import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {PrismaClient} from "@prisma/client";
import { cache } from 'react'
import {cookies} from "next/headers";


interface DatabaseUserAttributes {
    id: string;
    email: string;
    password_hash: string;
    sessions?: Session[];
}

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            email: attributes.email,
            password_hash: attributes.password_hash,
            sessions: attributes.sessions
        }
    }
});

export const validateRequest = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return {
        user: null,
        session: null
    };
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return {user, session};
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}


