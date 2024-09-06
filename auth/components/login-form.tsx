'use client'

import CardWrapper from "@/auth/components/CardWrapper";
import {LoginSchema} from "@/schema";
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
import {signIn} from "@/auth/auth_actions/signIn";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const LoginForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {

        const res = await signIn(data)

        if (res?.success) {
            toast.success('Login successfully')
            router.push('/admin')
        } else {
            toast.error(res?.error)
        }

    }

    const {pending} = useFormStatus()

    return (
        <CardWrapper
            label={'Login to your account'}
            title={'Login'}
            backButtonHref={'/register'}
            backButtonLabel={"don't have an account? Login here"}
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

                        <Button type={'submit'} className={'w-full'} disabled={pending}>
                            Login
                        </Button>
                    </div>
                </form>
            </Form>

        </CardWrapper>
    );
};

export default LoginForm;


// created on 21/08/2024 18:46

