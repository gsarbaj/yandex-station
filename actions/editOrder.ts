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

export async function editOrder(formData: FormData) {


    const id = formData.get('id') as string
    const status = formData.get('status')
    const note = formData.get('note')
    const sku = formData.get('sku')
    const price = removeNonNumericAndSpacesAndConvertToNumber(formData.get('price') as string || '')
    const costumer = await db.costumer.findUnique({
        where: {
            // @ts-ignore
            phone_number: formData.get('costumer')
        }
    })
    const payment = formData.get('payment')





    const editOrder = await db.order.update({
        where: {

            id: parseInt(id)
        },
        data: {
            // @ts-ignore
            order_state: status,
            // @ts-ignore
            note: note,
            product: {
                connect: [
                    {
                        // @ts-ignore
                        sku: sku
                    }
                ]
            },
            // @ts-ignore
            // costumer: {
            //     connect: {
            //         // @ts-ignore
            //         id: 1
            //     }
            // },
            // order_price: price
        }
    })

    // const order = await db.order.create({
    //     data: {
    //        order_price: price,
    //         costumer: {
    //             connect: {
    //                 // @ts-ignore
    //                 phone_number: costumer
    //             }
    //         },
    //         // @ts-ignore
    //         product: {
    //            connect: [
    //                {
    //                    // @ts-ignore
    //                    sku: sku
    //                }
    //            ]
    //         }
    //     }
    // })


    revalidatePath('/admin/orders/')
    redirect('/admin/orders/')
}