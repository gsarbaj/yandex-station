'use client'

import React, {useRef, useState} from 'react';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


import {z} from "zod"
import {useRouter, useSearchParams} from "next/navigation";

import * as actions from '@/actions'
import {Cross1Icon} from "@radix-ui/react-icons";


export const revalidate = 0


const formSchema = z.object({
    id: z.string().min(2, {
        message: "ID must be at least 2 characters.",
    }),
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
    slug: z.string().min(0, {
        message: "Slug must be at least 5 characters",
    }),
    revolut_link: z.string().min(5, {
        message: "Link generated in Revolut App",
    }),
    swedbank_link: z.string().min(5, {
        message: "Link generated in Swedbank App",
    }),

})


const EditProductForm = () => {


    const router = useRouter()
    const searchParams = useSearchParams()

    const product_id = searchParams.get("product_id") || ""
    const sku = searchParams.get("sku") || ""
    const price = ((parseInt(searchParams.get("price") || '0')) / 100).toString()
    const title = searchParams.get('title') || ''
    const description = searchParams.get('description') || ''
    const qty = searchParams.get('quantity') || ''
    const slug = searchParams.get('slug') || ''
    const rlink = searchParams.get('rlink') || ''
    const slink = searchParams.get('slink') || ''

    const ref = useRef<HTMLFormElement>(null);

    function onSubmit(formData: FormData) {
        actions.editProduct(formData).finally(() => ref.current?.reset())
    }


    return (
        <>
            <form action={onSubmit} ref={ref}>
            <div className={'absolute top-2 right-2 p-1'}>
                <Button variant="outline" type={'reset'} size="icon" onClick={() => {router.push(`?add_product=close`)}} >
                    <Cross1Icon className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid gap-2 py-4">
                <div className={'mb-4'}>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Product</h3>
                </div>


                    <div className={'flex justify-between gap-6 mb-2'}>
                        <div>
                            <Label className={'mb-2'} htmlFor="id">ID</Label>
                            <Input readOnly className={'w-12 bg-slate-50 text-slate-300 pointer-events-none'} placeholder={"ID"} id="id" type="text" name={'id'}
                                   defaultValue={product_id}/>
                        </div>
                        <div>
                            <Label className={'mb-2'} htmlFor="sku">SKU</Label>
                            <Input placeholder={"SKU"} id="sku" type="text" name={'sku'} defaultValue={sku}/>
                        </div>
                        <div>
                            <Label className={'mb-2'} htmlFor="price">Price</Label>
                            <Input placeholder={"150.00"} id="price" type="text" name={'price'} defaultValue={((parseFloat(price)).toFixed(2)).toString()}/>
                        </div>
                    </div>

                    <div className={'mb-4'}>

                        <div className={'my-2'}>
                            <Label className={'mb-2'} htmlFor="title">Product Name</Label>
                            <Input placeholder={"Product Title"} id="title" type="text" name={'title'}
                                   defaultValue={title}/>
                        </div>

                        <div className={'my-4'}>
                            <Label className={'mb-2'} htmlFor="description">Product Description</Label>
                            {/*<Input placeholder={"Product Description"} id="description" type="text" name={'description'}*/}
                            {/*       defaultValue={description}/>*/}
                            <Textarea placeholder={"Product Description"} id="description" name={'description'}
                                      defaultValue={description}/>
                        </div>

                        <div className={'flex justify-between gap-6 mb-2'}>
                            <div className={'my-4'}>
                                <Label className={'mb-2'} htmlFor="qty">Stock Quantity</Label>
                                <Input placeholder={"17"} id="qty" type="text" name={'qty'}
                                       defaultValue={qty}/>
                            </div>
                            <div className={'my-4'}>
                                <Label className={'mb-2'} htmlFor="slug">Slug</Label>
                                <Input placeholder={"midi"} id="slug" type="text" name={'slug'}
                                       defaultValue={slug}/>
                            </div>

                        </div>



                        <div className={'my-4'}>
                            <Label className={'mb-2'} htmlFor="rlink">Revolut Link</Label>
                            <Input placeholder={"https://revolut.me/r/m90iCkLlMR"} id="rlink" type="text" name={'rlink'}
                                   defaultValue={rlink}/>
                        </div>

                        <div className={'my-4'}>
                            <Label className={'mb-2'} htmlFor="slink">Swedbank Link</Label>
                            <Input placeholder={"https://www.swedbank.lt/pay?id=2s633thf894jb"} id="slink" type="text" name={'slink'}
                                   defaultValue={slink}/>
                        </div>



                    </div>

                    <div className={'flex gap-2'}>
                        <Button type={'submit'}>Save</Button>
                        <Button variant={'secondary'} type={'reset'} onClick={() => {router.push(`?add_product=close`)}}>Cancel</Button>
                    </div>



            </div>
        </form>
        </>
    )


    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         sku: '',
    //     },
    // })
    //
    //
    //
    // function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
    //     // Use a regular expression to replace all non-numeric characters and spaces with an empty string
    //     const numericString = str.replace(/[^0-9]/g, '');
    //     // Convert the resulting string to a number
    //     return parseInt(numericString);
    // }
    //
    //
    // function onSubmit(values: z.infer<typeof formSchema>) {
    //
    //
    //     registerNewProduct(values).finally()
    //
    // }
    //
    //
    // return (
    //     <>
    //         <div className="grid gap-2 py-4">
    //             <div className={'mb-4'}>
    //                 {/*@ts-ignore*/}
    //                 <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Product</h3>
    //             </div>
    //             <Form {...form} >
    //                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    //                     <div className={'flex justify-between gap-6'}>
    //
    //                         <FormField
    //                             control={form.control}
    //                             name="id"
    //                             render={({field}) => (
    //                                 <FormItem>
    //                                     <FormLabel>ID</FormLabel>
    //                                     <FormControl>
    //                                         <Input disabled placeholder="ID" {...field} defaultValue={product_id} className={'w-12'}/>
    //                                     </FormControl>
    //                                     <FormMessage/>
    //                                 </FormItem>
    //
    //                             )}
    //                         />
    //
    //                         <FormField
    //                             control={form.control}
    //                             name="sku"
    //                             render={({field}) => (
    //                                 <FormItem>
    //                                     <FormLabel>SKU</FormLabel>
    //                                     <FormControl>
    //                                         <Input placeholder="SKU" {...field} defaultValue={sku}/>
    //                                     </FormControl>
    //                                     <FormMessage/>
    //                                 </FormItem>
    //
    //                             )}
    //                         />
    //
    //                         <FormField
    //                             control={form.control}
    //                             name="price"
    //                             render={({field}) => (
    //                                 <FormItem className={''}>
    //                                     <FormLabel>Product Price</FormLabel>
    //                                     <FormControl>
    //                                         <Input className={'w-[120px]'} placeholder="120.00" {...field} defaultValue={price}/>
    //                                     </FormControl>
    //                                     <FormMessage/>
    //                                 </FormItem>
    //
    //                             )}
    //                         />
    //
    //                     </div>
    //
    //                     <FormField
    //                         control={form.control}
    //                         name="title"
    //                         render={({field}) => (
    //                             <FormItem>
    //                                 <FormLabel>Product Name</FormLabel>
    //                                 <FormControl>
    //                                     <Input placeholder="Title" {...field} defaultValue={title} />
    //                                 </FormControl>
    //                                 <FormMessage/>
    //                             </FormItem>
    //
    //                         )}
    //                     />
    //
    //
    //                     <FormField
    //                         control={form.control}
    //                         name="description"
    //                         render={({field}) => (
    //                             <FormItem>
    //                                 <FormLabel>Product Description</FormLabel>
    //                                 <FormControl>
    //                                     <Input placeholder="Description" {...field} defaultValue={description}/>
    //                                 </FormControl>
    //                                 <FormMessage/>
    //                             </FormItem>
    //
    //                         )}
    //                     />
    //
    //
    //                     <FormField
    //                         control={form.control}
    //                         name="stock_qty"
    //                         render={({field}) => (
    //                             <FormItem>
    //                                 <FormLabel>Stock Quantity</FormLabel>
    //                                 <FormControl>
    //                                     <Input placeholder="15" {...field} defaultValue={qty}/>
    //                                 </FormControl>
    //                                 <FormMessage/>
    //                             </FormItem>
    //
    //                         )}
    //                     />
    //
    //                     <FormField
    //                         control={form.control}
    //                         name="revolut_link"
    //                         render={({field}) => (
    //                             <FormItem>
    //                                 <FormLabel>Revolut Link</FormLabel>
    //                                 <FormControl>
    //                                     <Input placeholder="https://revolut.me/r/m90iCkLlMR" {...field} defaultValue={rlink}/>
    //                                 </FormControl>
    //                                 <FormMessage/>
    //                             </FormItem>
    //
    //                         )}
    //                     />
    //
    //                     <FormField
    //                         control={form.control}
    //                         name="swedbank_link"
    //                         render={({field}) => (
    //                             <FormItem>
    //                                 <FormLabel>Swedbank Link</FormLabel>
    //                                 <FormControl>
    //                                     <Input
    //                                         placeholder="https://www.swedbank.lt/pay?id=2s633thf894jb" {...field} defaultValue={slink} className={''}/>
    //                                 </FormControl>
    //                                 <FormMessage/>
    //                             </FormItem>
    //
    //                         )}
    //                     />
    //                         <div className={'gap-2 flex'}>
    //                             <Button type="submit" >Save</Button>
    //                             <Button variant={'outline'} onClick={() => {router.push(`?add_product=close`)}} type={'button'}>Cancel</Button>
    //                         </div>
    //
    //
    //
    //                 </form>
    //             </Form>
    //         </div>
    //     </>
    // );
};

export default EditProductForm;