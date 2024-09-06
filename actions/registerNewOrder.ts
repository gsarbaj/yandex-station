'use server'


import {db} from '@/db'
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
    // Use a regular expression to replace all non-numeric characters and spaces with an empty string
    const numericString = str.replace(/[^0-9]/g, '');
    // Convert the resulting string to a number
    return parseInt(numericString);
}

export async function registerNewOrder(formData: FormData) {

    console.log('FORM DATA ', formData);


    const sku = formData.get('sku')
    const price = removeNonNumericAndSpacesAndConvertToNumber(formData.get('price') as string || '')
    const costumer = formData.get('costumer')
    const note = formData.get('note')


    const order = await db.order.create({
        data: {
            order_price: price,

            // @ts-ignore
            note: note,
            costumer: {
                connect: {
                    // @ts-ignore
                    phone_number: costumer
                }
            },
            // @ts-ignore
            product: {
                connect: [
                    {
                        // @ts-ignore
                        sku: sku
                    }
                ]
            }
        }
    })


    revalidatePath('/admin/orders/')
    redirect('/admin/orders/')
}