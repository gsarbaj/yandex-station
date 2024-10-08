// 'use client'
//
// import React, {useState} from 'react';
// import CardWrapper from "@/components/auth/CardWrapper";
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
// import * as z from 'zod';
// import {RegisterSchema} from '@/schemas'
// import {Input} from "@/components/ui/input";
// import {Button} from "@/components/ui/button";
// import FormError from "@/components/forms/FormError";
// import FormSuccess from "@/components/forms/FormSuccess";
// import * as actions from '@/actions'
// import {useTransition} from "react";
//
// const RegisterForm = () => {
//
//     const [error, setError] = useState<string | undefined>('')
//     const [success, setSuccess] = useState<string | undefined>('')
//
//
//     const [isPending, startTransition] = useTransition();
//
//     const form = useForm<z.infer<typeof RegisterSchema>>({
//         resolver: zodResolver(RegisterSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//             name: ""
//         }
//     })
//
//     const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
//
//         setError('')
//         setSuccess('')
//
//         startTransition(() => {
//
//             actions.Register(values).then((data) => {
//
//                 setError(data.error)
//                 setSuccess(data.success)
//             })
//
//         })
//
//     }
//
//     return (
//         <>
//             <CardWrapper headerLabel={'Create an account'} backButtonLabel={'Already have an account?'}
//                          backButtonHref={'/auth/login'} showSocial>
//
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
//                         <div className={'space-y-4'}>
//
//                             <FormField
//                                 control={form.control}
//                                 name={'name'}
//                                 render={({field}) => (
//                                     <FormItem>
//                                         <FormLabel>Name</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 placeholder={'John Doe'}
//                                                 type={'text'}
//                                                 disabled={isPending}
//                                             />
//                                         </FormControl>
//                                         <FormMessage/>
//                                     </FormItem>
//                                 )}
//                             />
//
//                             <FormField
//                                 control={form.control}
//                                 name={'email'}
//                                 render={({field}) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 placeholder={'john.doe@example.com'}
//                                                 type={'email'}
//                                                 disabled={isPending}
//                                             />
//                                         </FormControl>
//                                         <FormMessage/>
//                                     </FormItem>
//                                 )}
//                             />
//
//                             <FormField
//                                 control={form.control}
//                                 name={'password'}
//                                 render={({field}) => (
//                                     <FormItem>
//                                         <FormLabel>Password</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 placeholder={'*********'}
//                                                 type={'password'}
//                                                 disabled={isPending}
//                                             />
//                                         </FormControl>
//                                         <FormMessage/>
//                                     </FormItem>
//                                 )}
//                             />
//
//                         </div>
//
//                         <FormError message={error}/>
//                         <FormSuccess message={success}/>
//
//                         <Button type={'submit'} className={'w-full'} disabled={isPending}>
//                             Register
//                         </Button>
//
//                     </form>
//                 </Form>
//
//             </CardWrapper>
//
//         </>
//     );
// };
//
// export default RegisterForm;