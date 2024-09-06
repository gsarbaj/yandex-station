import React from 'react';
import {protectRoute} from "@/auth/auth_actions/protectRoute";

const AuthLayout = async ({children}: { children: React.ReactNode }) => {

    // await protectRoute();

    return (
        <section className={'w-full'}>
            <div className={'h-screen flex items-center justify-center'}>
                {children}
            </div>
        </section>
    );
};

export default AuthLayout;


// created on 21/08/2024 19:42