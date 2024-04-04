'use server'

import {db} from '@/db'
import {baseObjectInputType, baseObjectOutputType, objectUtil, TypeOf, ZodObject, ZodString, ZodTypeAny} from "zod";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

interface RegisterNewProductProps {
    sku: string,
    title: string,
    description: string,
    price: string,
    revolut_link: string
    swedbank_link: string
    stock_qty: string
}


function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
    // Use a regular expression to replace all non-numeric characters and spaces with an empty string
    const numericString = str.replace(/[^0-9]/g, '');
    // Convert the resulting string to a number
    return parseInt(numericString);
}

export async function registerNewProduct(values: TypeOf<ZodObject<{
    price: ZodString;
    stock_qty: ZodString;
    description: ZodString;
    swedbank_link: ZodString;
    sku: ZodString;
    title: ZodString;
    revolut_link: ZodString
}, "strip", ZodTypeAny, {
    [k_1 in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }>, {
        [k in keyof baseObjectOutputType<{
            price: ZodString;
            stock_qty: ZodString;
            description: ZodString;
            swedbank_link: ZodString;
            sku: ZodString;
            title: ZodString;
            revolut_link: ZodString
        }>]: undefined extends baseObjectOutputType<{
            price: ZodString;
            stock_qty: ZodString;
            description: ZodString;
            swedbank_link: ZodString;
            sku: ZodString;
            title: ZodString;
            revolut_link: ZodString
        }>[k] ? never : k
    }[keyof {
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }]>]: objectUtil.addQuestionMarks<baseObjectOutputType<{
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }>, {
        [k in keyof baseObjectOutputType<{
            price: ZodString;
            stock_qty: ZodString;
            description: ZodString;
            swedbank_link: ZodString;
            sku: ZodString;
            title: ZodString;
            revolut_link: ZodString
        }>]: undefined extends baseObjectOutputType<{
            price: ZodString;
            stock_qty: ZodString;
            description: ZodString;
            swedbank_link: ZodString;
            sku: ZodString;
            title: ZodString;
            revolut_link: ZodString
        }>[k] ? never : k
    }[keyof {
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }]>[k_1]
}, {
    [k_2 in keyof baseObjectInputType<{
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }>]: baseObjectInputType<{
        price: ZodString;
        stock_qty: ZodString;
        description: ZodString;
        swedbank_link: ZodString;
        sku: ZodString;
        title: ZodString;
        revolut_link: ZodString
    }>[k_2]
}>>) {


    console.log(values)

    const registerProduct = await db.product.create({
        data: {
            sku: values.sku,
            title: values.title,
            description: values.description,
            price: removeNonNumericAndSpacesAndConvertToNumber(values.price),
            revolut_link: values.revolut_link,
            swedbank_link: values.swedbank_link,
            stock_qty: removeNonNumericAndSpacesAndConvertToNumber(values.stock_qty)
        }
    })

    console.log(registerProduct);

    revalidatePath('/admin/products/')
    redirect('/admin/products/')
}