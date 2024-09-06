// 'use server'
//
// import {baseObjectInputType, baseObjectOutputType, objectUtil, TypeOf, ZodObject, ZodString, ZodTypeAny} from "zod";
// import * as bcrypt from 'bcrypt'
// import {db} from "@/db";
//
//
//
// export async function signInUser(values: TypeOf<ZodObject<{
//     password: ZodString;
//     username: ZodString
// }, "strip", ZodTypeAny, {
//     [k_1 in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//         password: ZodString;
//         username: ZodString
//     }>, {
//         [k in keyof baseObjectOutputType<{
//             password: ZodString;
//             username: ZodString
//         }>]: undefined extends baseObjectOutputType<{ password: ZodString; username: ZodString }>[k] ? never : k
//     }[keyof { password: ZodString; username: ZodString }]>]: objectUtil.addQuestionMarks<baseObjectOutputType<{
//         password: ZodString;
//         username: ZodString
//     }>, {
//         [k in keyof baseObjectOutputType<{
//             password: ZodString;
//             username: ZodString
//         }>]: undefined extends baseObjectOutputType<{ password: ZodString; username: ZodString }>[k] ? never : k
//     }[keyof { password: ZodString; username: ZodString }]>[k_1]
// }, {
//     [k_2 in keyof baseObjectInputType<{ password: ZodString; username: ZodString }>]: baseObjectInputType<{
//         password: ZodString;
//         username: ZodString
//     }>[k_2]
// }>>) {
//
//
//     const registerUser = await db.user.create({
//         data: {
//             email: values.username,
//             password: await bcrypt.hash(values.password, 10)
//         }
//     })
//
//
// }