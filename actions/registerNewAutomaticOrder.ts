'use server'


import {db} from '@/db'
import axios from "axios";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {toMoney} from "@/util/toMoney";


const bot = {
    CHAT_ID: '-4147884596'
}

function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
    // Use a regular expression to replace all non-numeric characters and spaces with an empty string
    const numericString = str.replace(/[^0-9]/g, '');
    // Convert the resulting string to a number
    return parseInt(numericString);
}

let orderNr;

async function orderCash(productSlug: string, first_name: string, last_name: string, phone_number: string, user_address: string, region: string, note: string, payment_type: string) {

   let orderDetails;


    try {

        // Fetch product by slug

        const productId = await db.product.findUnique({
            where: {slug: productSlug},
            select: {
                id: true,
                price: true,
                title: true,
                slug: true,
                sku: true
            }
        })

        if (!productId) {
            throw new Error('Product not found')
        }

        // console.log(productId)

        // Create new costumer

        let costumer = await db.costumer.findUnique({
            where: {
                phone_number: phone_number as string
            }
        });


        if (costumer) {
            note = note + ' (повторный заказ) '
        }

        if (!costumer) {
            costumer = await db.costumer.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone_number,
                    user_address: user_address,
                    region: region,
                }
            })
        }

        note = note + ' ' + first_name + ' ' + last_name + ' ' + phone_number + ' ' + 'ДОСТАВКА: ' + user_address + ' ' + region + ' ОПЛАТА: ' + payment_type + ' ПРОДУКТ: ' + productId.title + ' (' + productId.sku + ') ' + toMoney(productId.price as number).priceRegular + ' EUR'


        // Create new order

        const order = await db.order.create({
            data: {
                costumer: {
                    connect: {
                        id: costumer.id
                    }
                },
                order_type: 'WEB',
                order_price: productId.price as number,
                qty: 1,
                product: {
                    connect: {id: productId.id}
                },
                Payment: {
                    create: {
                        payment_type: 'CASH',
                        confirmed: false
                    }
                },
                note: note
            }
        })

         console.log('ORDER ',order)
        orderDetails = order


        return {message: 'success'}
        // Telegram message

        // await axios.post(`${process.env["TELEGRAM_BOT_API"]}/sendMessage`, {
        //     chat_id: bot.CHAT_ID,
        //     text: `НОВЫЙ ЗАКАЗ: ${note}`
        // })

    } catch (error) {
        console.error('Error creating order ', error)
        return {message: 'Error creating order'}
    } finally {
        console.log('FINALLY', )
        db.$disconnect();

        console.log('DETAILS ',orderDetails)


        // revalidatePath(`/${productSlug}`)

        
        redirect(`/order/${orderDetails?.idHash}`)
    }


}

async function orderSwed() {
    console.log('ORDER SWED')
}


export async function registerNewAutomaticOrder(prevState: any, formData: FormData) {

    // console.log(formData);

    const first_name = formData.get('first_name')
    const last_name = formData.get('last_name')
    const phone_number = formData.get('phone_number')
    const user_address = formData.get('user_address')
    const region = formData.get('region')
    const product = formData.get('product')
    const order_price = formData.get('order_price')
    const note = formData.get('note')
    const payment_type = formData.get('payment_type')


    switch (payment_type) {
        case 'cash':
            await orderCash(product as string, first_name as string, last_name as string, phone_number as string, user_address as string, region as string, note as string, payment_type as string)
            break;

        case 'swed':
            await orderSwed()
            break;

        default:
            console.log("DEFAULT ", payment_type);
    }

}