import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/db"
import {getUserById} from "@/data/user";




export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({token, session}){
            console.log({sessionToken: token, session})

            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {

                session.user.role = token.role as "ADMIN" | "USER"
            }

            return session
        },
        async jwt({token}){

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;


            token.role = existingUser.role

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    secret: "fkjjk4ijt8ffsl48fnc835unc7356ncc398ncncjdioiuuroiwuroietrwcnncwiw",
    ...authConfig,
})