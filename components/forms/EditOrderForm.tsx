'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import {z} from "zod"
import {useRouter, useSearchParams} from "next/navigation";

import * as actions from '@/actions'
import {Cross1Icon} from "@radix-ui/react-icons";
import {useQuery} from "@tanstack/react-query";
import {getData} from "@/actions";
import {Textarea} from "@/components/ui/textarea";


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


const EditOrderForm = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const order_id = searchParams.get("order_id") || ""
    const sku = searchParams.get("sku") || ""
    const costumer = '+' + searchParams.get('costumer')?.replace(/\s/g, '') || ''
    const state = searchParams.get('state')?.replace(/\s/g, '') || ''
    const price = ((parseInt(searchParams.get("price") || '0')) / 100).toString()
    const note = searchParams.get("note") || ""


    const [stateRender, setStateRender] = useState(state)
    const [allouRender, setAllouRender] = useState(true)

    if (allouRender && state === searchParams.get('state')?.replace(/\s/g, '')) {
        setStateRender(state)
        setAllouRender(false)
    }


    const [costumersRender, setCostumersRender] = useState([])
    const [value, setValue] = useState('')
    const [inputOpen, setInputOpen] = useState(true)


    const [productsRender, setProductsRender] = useState([])
    const [productsValue, setProductsValue] = useState(sku)
    const [productPrice, setProductPrice] = useState('')
    const [inputProductsOpen, setInputProductsOpen] = useState(true)


    const {data, error, isFetched} = useQuery({
        queryKey: ['data'],
        queryFn: getData
    })

    console.log('DATA STORE ', data)


    const ref = useRef<HTMLFormElement>(null);

    function onSubmit(formData: FormData) {
        actions.editOrder(formData).finally(() => {
            ref.current?.reset()
            setAllouRender(true)
        })
    }


    function onInputChange(event: React.FormEvent<HTMLInputElement>) {

        const inputTarget = event.target as HTMLInputElement;


        setValue(inputTarget.value)
        setInputOpen(true)

        const filteredNumbers: string[] = []

        // @ts-ignore
        setCostumersRender(filteredNumbers)

        data?.costumers.forEach((costumer) => {
            if (costumer.phone_number?.indexOf(inputTarget.value) !== -1) {
                filteredNumbers.push(costumer.phone_number as string)

                // @ts-ignore
                setCostumersRender(filteredNumbers)
                setValue(inputTarget.value)
            }
        })
    }

    function onProductInputChange(event: React.FormEvent<HTMLInputElement>) {


        const inputTarget = event.target as HTMLInputElement;


        setProductsValue(inputTarget.value)
        setInputProductsOpen(true)

        const filteredNumbers: string[] = []

        // @ts-ignore
        setProductsRender(filteredNumbers)

        console.log(data);

        data?.products.forEach((product: any) => {
            if (product.sku?.indexOf(inputTarget.value) !== -1) {
                filteredNumbers.push(product as string)

                // @ts-ignore
                setProductsRender(filteredNumbers)
                setProductsValue(inputTarget.value)
            }
        })
    }


    // @ts-ignore
    return (
        <>

            <form action={onSubmit} ref={ref}>
                <div className={'absolute top-2 right-2 p-1'}>
                    <Button variant="outline" type={'reset'} size="icon" onClick={() => {
                        router.push(`?new_order=close`)
                        setAllouRender(true)
                        setValue('')
                        setProductsValue('')
                        setProductPrice('')
                    }}>
                        <Cross1Icon className="h-4 w-4"/>
                    </Button>
                </div>
                <div className="grid gap-2 py-4">
                    <div className={'mb-4'}>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Order</h3>
                    </div>


                    <div className={'flex justify-between gap-6 mb-2'}>
                        <div>
                            <Label className={'mb-2'} htmlFor="id">ID</Label>
                            <Input readOnly className={'w-12 bg-slate-50 text-slate-300 pointer-events-none'}
                                   placeholder={"ID"} id="id" type="text" name={'id'}
                                   defaultValue={order_id}/>
                        </div>

                        <div>
                            <Label className={'mb-2'} htmlFor={'state'}>State</Label>

                            <Select value={stateRender} onValueChange={(value) => {
                                setStateRender(value)
                            }}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Order State"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {/*<SelectLabel>Fruits</SelectLabel>*/}
                                        <SelectItem value="NEW">NEW</SelectItem>
                                        <SelectItem value="PENDING">PENDING</SelectItem>
                                        <SelectItem value="SHIPPING">SHIPPING</SelectItem>
                                        <SelectItem value="FINISHED">FINISHED</SelectItem>
                                        <SelectItem value="DELETED">DELETED</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Input name={'status'} value={stateRender} type={'hidden'}/>
                        </div>

                        <div>
                            <Label className={'mb-2 z-30'} htmlFor="sku">Product</Label>
                            <Input
                                placeholder={"Product SKU"}
                                id="sku"
                                type="text"
                                name={'sku'}
                                value={sku}
                                onInput={(e) => {
                                    onProductInputChange(e)
                                }}
                            />
                            <div className={'pt-1 z-30'}>

                                {productsValue.length > 0 && inputProductsOpen ?
                                    <ul className={'absolute bg-white border rounded-md w-full z-30'}>


                                        {productsRender
                                            .slice(0, 10)
                                            .map((item: any) => (
                                                <li key={item.sku}><Button onClick={() => {
                                                    router.push(`?edit_order=open&order_id=${order_id}&sku=${item.sku}&costumer=${costumer}&state=${state}`)
                                                    setProductsValue(item.sku)
                                                    setProductPrice(((parseFloat(item.price) / 100).toFixed(2)).toString())
                                                    setInputProductsOpen(false)
                                                }} className={'w-full'} variant={'ghost'}
                                                                           type={'button'}>{item.sku}</Button></li>
                                            ))}
                                    </ul> : null}

                            </div>
                        </div>
                        <div>
                            <Label className={'mb-2 z-0'} htmlFor="price">Price</Label>
                            <Input readOnly className={'bg-slate-50 text-slate-300 pointer-events-none'}
                                   placeholder={"150.00"} id="price" type="text" name={'price'}
                                   defaultValue={((parseFloat(price)).toFixed(2)).toString()}
                                   value={productPrice}

                            />
                        </div>
                    </div>

                    <div className={'mb-4'}>

                        <div className={'my-2 flex gap-2'}>

                            <div className={'inline-block relative'}>
                                <Label className={'mb-2'} htmlFor="title">Costumer</Label>
                                <Input

                                    readOnly className={'bg-slate-50 text-slate-300 pointer-events-none'}
                                    placeholder={"+37067707257"}
                                    id="costumer"
                                    type="text"
                                    name={'costumer'}
                                    value={costumer}
                                    onInput={(e) => {
                                        onInputChange(e)
                                    }}
                                />
                                <div className={'pt-1'}>

                                    {value.length > 0 && inputOpen ?
                                        <ul className={'absolute bg-white border rounded-md w-full'}>

                                            {costumersRender
                                                .slice(0, 10)
                                                .map((item) => (
                                                    <li key={item}><Button onClick={() => {
                                                        router.push(`?edit_order=open&order_id=${order_id}&sku=${sku}&costumer=${item}&state=${state}`)
                                                        setValue(item)
                                                        setInputOpen(false)
                                                    }} className={'w-full'} variant={'ghost'}
                                                                           type={'button'}>{item}</Button></li>
                                                ))}
                                        </ul> : null}

                                </div>

                            </div>


                        </div>


                        <div className={'my-2 flex gap-2'}>

                            <div className={''}>
                                <Label className={'mb-2'} htmlFor="payment">Payment Received</Label>
                                <Input readOnly className={'bg-slate-50 text-slate-300 pointer-events-none'}
                                       placeholder={"150.00"} id="payment" type="text" name={'payment'}
                                       defaultValue={((parseFloat(price)).toFixed(2)).toString()}/>

                            </div>
                            <div className={'flex flex-col'}>
                                <Label className={'mb-2'} htmlFor="add_payment">Create Payment</Label>
                                <Button type={'button'} variant={'outline'} id="add_payment" name={'add_payment'}>Add
                                    Payment</Button>
                            </div>

                        </div>

                        <div className={''}>
                            <Label className={'mb-2'} htmlFor="note">Note</Label>
                            <Textarea id={'note'} name={'note'} placeholder="Type your note here." defaultValue={note}/>

                        </div>


                    </div>

                    <div className={'flex gap-2'}>
                        <Button type={'submit'}>Save</Button>
                        <Button variant={'secondary'} type={'reset'} onClick={() => {
                            router.push(`?new_order=close`)
                            setValue('')
                            setAllouRender(true)
                            setProductsValue('')
                            setProductPrice('')
                            setStateRender('')
                        }}>Cancel</Button>
                    </div>


                </div>
            </form>
        </>
    )

};

export default EditOrderForm;