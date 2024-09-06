'use server'

import {db} from '@/db'
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

interface editProductProps {
    id: string,
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

export async function editProduct(formData: FormData) {



    const id = formData.get('id') as string
    const sku = formData.get('sku') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const qty = formData.get('qty') as string
    const slug = formData.get('slug') as string
    const rlink = formData.get('rlink') as string
    const slink = formData.get('slink') as string



    const editProduct = await db.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            sku: sku,
            title: title,
            description: description,
            price: removeNonNumericAndSpacesAndConvertToNumber(price),
            revolut_link: rlink,
            swedbank_link: slink,
            stock_qty: removeNonNumericAndSpacesAndConvertToNumber(qty),
            slug: slug
        }
    })



    revalidatePath('/admin/products/')
    redirect('/admin/products/')
}