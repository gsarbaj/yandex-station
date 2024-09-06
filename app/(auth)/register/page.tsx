import React from 'react';
import RegisterForm from "@/auth/components/register-form";
import {protectRoute} from "@/auth/auth_actions/protectRoute";

const RegisterPage = async () => {
    await protectRoute();
    return (
        <>
            <RegisterForm/>
        </>
    );
};

export default RegisterPage;


// created on 21/08/2024 20:04