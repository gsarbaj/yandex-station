'use server'

import {db} from "@/db";

export async function getData() {

    const costumers = await db.costumer.findMany({
        select: {
            phone_number: true
        }
    })

    const products = await db.product.findMany({
        select: {
            sku: true,
            price: true
        }
    })

    return {costumers: [...costumers], products: [...products]};
}