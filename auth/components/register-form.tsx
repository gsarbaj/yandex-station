'use client'

import CardWrapper from "@/auth/components/CardWrapper";
import {RegisterSchema} from "@/schema";
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {useFormStatus} from 'react-dom'
import {signUp} from "@/auth/auth_actions/signUp";
import {toast} from "sonner";
import {useRouter} from "next/navigation";




const RegisterForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {

        const res = await signUp(data)

        if (res?.success) {
          toast.success('Register successfully')
            router.push('/admin')
        } else {
            toast.error(res?.error)
        }

    }

    const {pending} = useFormStatus()

    return (
        <CardWrapper
            label={'Create an account'}
            title={'Register'}
            backButtonHref={'/login'}
            backButtonLabel={'Have an account? Login here'}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>

                    <div className={'space-y-4'}>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type={'email'} placeholder={'johndoe@gmail.com'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'email'}/>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type={'password'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'password'}/>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Re-enter password</FormLabel>
                                <FormControl>
                                    <Input {...field} type={'password'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'confirmPassword'}/>

                        <Button type={'submit'} className={'w-full'} disabled={pending}>
                            Register
                        </Button>
                    </div>
                </form>
            </Form>

        </CardWrapper>
    );
};

export default RegisterForm;


// created on 21/08/2024 18:46