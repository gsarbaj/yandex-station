'use client'

import React, {useRef, useState} from 'react';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {registerNewProduct} from "@/actions";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";


export const revalidate = 0


const formSchema = z.object({
    sku: z.string().min(2, {
        message: "SKU must be at least 2 characters.",
    }),
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(2, {
        message: "SKU must be at least 2 characters.",
    }),
    price: z.string().min(0, {
        message: "Price must be more than 0,00 eur",
    }),
    stock_qty: z.string().min(0, {
        message: "Quantity must be more than 0",
    }),
    slug: z.string().min(1, {
        message: "Slug must be at least 1 character",
    }),
    revolut_link: z.string().min(5, {
        message: "Link generated in Revolut App",
    }),
    swedbank_link: z.string().min(5, {
        message: "Link generated in Swedbank App",
    }),

})

const AddNewProductForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sku: "",
        },
    })

    function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
        // Use a regular expression to replace all non-numeric characters and spaces with an empty string
        const numericString = str.replace(/[^0-9]/g, '');
        // Convert the resulting string to a number
        return parseInt(numericString);
    }


    const ref = useRef<HTMLFormElement>(null);
    function onSubmit(values: z.infer<typeof formSchema>) {


        registerNewProduct(values).finally(() => ref.current?.reset())

    }


    return (
        <>
            <div className="grid gap-2 py-4">
                <div className={'mb-4'}>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
                </div>
                <Form {...form} >
                    <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <div className={'flex justify-between gap-6'}>
                            <FormField
                                control={form.control}
                                name="sku"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input placeholder="SKU" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>

                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem className={''}>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input className={'w-[120px]'} placeholder="120.00" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>

                                )}
                            />

                        </div>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />


                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        {/*<Input placeholder="Description" {...field} />*/}
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <div className={'flex justify-between gap-6'}>

                            <FormField
                                control={form.control}
                                name="stock_qty"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Stock Quantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder="15" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>

                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="midi" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>

                                )}
                            />

                        </div>

                        <FormField
                            control={form.control}
                            name="revolut_link"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Revolut Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://revolut.me/r/m90iCkLlMR" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="swedbank_link"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Swedbank Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://www.swedbank.lt/pay?id=2s633thf894jb" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                            <div className={'gap-2 flex'}>
                                <Button type="submit" >Save</Button>
                                <Button type={'reset'} variant={'outline'} onClick={() => {router.push(`?add_product=close`)}}>Cancel</Button>
                            </div>



                    </form>
                </Form>
            </div>
        </>
    );
};

export default AddNewProductForm;