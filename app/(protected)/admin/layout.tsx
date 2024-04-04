'use client'
import {SessionProvider} from "next-auth/react";
import AdminNavBar from "@/components/nav-bars/AdminNavBar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>


        <SessionProvider>
            <AdminNavBar/>
            {children}
        </SessionProvider>


        </>
    );
}