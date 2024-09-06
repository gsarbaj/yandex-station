import {Inter} from "next/font/google";
import "@/app/globals.css";
import Provider from "@/util/Providers";
import {protectRoute} from "@/auth/auth_actions/protectRoute";


const inter = Inter({subsets: ["latin"]});


export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    await protectRoute();

    return (
        <>
            <Provider>
                {children}
            </Provider>
        </>
    );
}