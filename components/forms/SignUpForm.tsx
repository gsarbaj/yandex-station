// "use client"
//
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import * as action from '@/actions'
//
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import Link from "next/link";
// import {useToast} from "@/components/ui/use-toast";
//
// const formSchema = z.object({
//     username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//     }),
//     password: z.string().min(2, {
//         message: "Password must be at least 2 characters.",
//     })
// })
// const SignUpForm = () => {
//
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: "",
//         },
//     })
//
//     const { toast } = useToast()
//
//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//
//
//         action.registerNewUser(values).finally(() => {
//                 toast({
//                     title: "User Registered",
//                     description: `User ${values.username} registered`,
//                 })
//             })
//
//
//     }
//
//     return (
//         <>
//
//             <Card className={'mt-6 min-w-80'}>
//                 <CardHeader>
//                     <CardTitle>Admin Registration</CardTitle>
//                     <CardDescription>Register Here</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                             <FormField
//                                 control={form.control}
//                                 name="username"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Username</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Username" {...field} />
//                                         </FormControl>
//
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//
//                             <FormField
//                                 control={form.control}
//                                 name="password"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Password</FormLabel>
//                                         <FormControl>
//                                             <Input type={'password'} placeholder="Password" {...field} />
//                                         </FormControl>
//
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//
//                             <div className={'flex justify-center'}>
//                                 <Button className={'w-full'} type="submit">Register</Button>
//                             </div>
//
//                         </form>
//                     </Form>
//                 </CardContent>
//                 <CardFooter className={'flex justify-between'}>
//                     <p>Have an account?</p> <Link className={'m-4'} href={'/auth/_signin'}>Sign In</Link>
//                 </CardFooter>
//             </Card>
//
//
//         </>
//     );
// };
//
// export default SignUpForm;