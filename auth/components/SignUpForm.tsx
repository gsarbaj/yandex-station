// import {Button} from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {Input} from "@/components/ui/input"
// import {Label} from "@/components/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import {signUp} from "@/auth/auth_actions/signUp";
//
// const SignUpForm = () => {
//
//     return (
//         <div className={'flex items-center justify-center h-screen'}>
//             <Card className="w-[350px]">
//
//                     <CardHeader>
//                         <CardTitle>Create an account</CardTitle>
//                         <CardDescription>Enter e-mail and password</CardDescription>
//                     </CardHeader>
//                 <form action={signUp}>
//
//                     <CardContent>
//                         <div className="grid w-full items-center gap-4">
//                         <div className={'flex flex-col space-y-1.5'}>
//                             <Label htmlFor="{'email'}">E-mail</Label>
//                             <Input id={'email'} name={'email'} type={'email'} placeholder={'E-mail'}/>
//                         </div>
//
//                         <div className={'flex flex-col space-y-1.5'}>
//                             <Label htmlFor="{'password'}">Password</Label>
//                             <Input id={'password'} name={'password'} type={'password'} placeholder={'Password'}/>
//                         </div>
//                         </div>
//
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                         <Button type={'submit'}>Register</Button>
//                         <Button variant="outline">Cancel</Button>
//                     </CardFooter>
//                 </form>
//             </Card>
//
//         </div>
//     );
// };
//
// export default SignUpForm;
//
//
// // created on 15/08/2024 13:32
