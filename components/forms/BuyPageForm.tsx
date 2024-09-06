'use client'

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import React from "react";
import * as actions from '@/actions'
import {useFormState, useFormStatus} from "react-dom";

const CashButton = () => {

    const {pending} = useFormStatus()

    return (<Button name={'payment_type'} value={'cash'} size={'lg'} type={'submit'} disabled={pending}>
            {pending ? "Отправляется..." : "Оплатить при получении"}
        </Button>)
}

type FormState = {
    message: string;
};


export default function BuyPageForm({product, price, title}: any) {

    const initialState = {
        message: null
    }

    function removeSpecialCharacters(str: String) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;


    const {pending} = useFormStatus()


    // @ts-ignore
    const [state, formAction] = useFormState<FormState>(actions.registerNewAutomaticOrder, initialState)


    return (<>
            <form action={formAction}>
                <div className={''}>

                    {/*Costumer*/}

                    <Label htmlFor={'first_name'}>Имя</Label>
                    <Input id={'first_name'} name={'first_name'} placeholder={'Vardas'}/>


                    <Label htmlFor={'last_name'}>Фамилия</Label>
                    <Input id={'last_name'} name={'last_name'} placeholder={'Pavardė'}/>

                    <Label htmlFor={'phone_number'}>Телефон</Label>
                    <Input id={'phone_number'} name={'phone_number'} required type={'tel'} placeholder={'+37067707257'}
                           defaultValue={'+370'}/>

                    {/*<Label htmlFor={'email'}>Электронная почта</Label>*/}
                    {/*<Input id={'email'} name={'email'} type={'email'} placeholder={'info@kolonka.eu'}/>*/}

                    <Label htmlFor={'user_address'}>Адресс</Label>
                    <Input id={'user_address'} name={'user_address'} type={'text'}
                           placeholder={'Draugystės 11-53 LT31212'}/>

                    <Label htmlFor={'region'}>Город</Label>
                    <Input id={'region'} name={'region'} type={'text'} placeholder={'Visaginas'}
                           defaultValue={'Visaginas'}/>

                    {/*Order*/}

                    <Input id={'product'} name={'product'} type={'hidden'} defaultValue={product}/>

                    <Input id={'order_price'} name={'order_price'} type={'hidden'} defaultValue={price}/>

                    <Input id={'note'} name={'note'} type={'hidden'} defaultValue={`${formattedDateTime}`}/>

                </div>

                <div className={''}>


                    {/*  Button Group  */}

                    <div className={'flex md:flex-row flex-col gap-4 py-6'}>

                        <div className={'lg:mb-12'}>
                            <CashButton/>
                        </div>

                        <div className={'lg:mb-12'}>
                            {/*  @ts-ignore  */}
                            <Button name={'payment_type'} value={'swed'} size={'lg'} type={'submit'}>Оплатить через
                                Swedbank</Button>
                        </div>

                    </div>

                </div>

            </form>

        </>);
};
