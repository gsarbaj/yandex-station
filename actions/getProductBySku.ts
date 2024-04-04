'use server'

import {db} from "@/db";

export async function getProductBySku({Sku}: any) {

    const product = await db.product.findUnique({
        where: {
            sku: Sku.toString()
        }
    })

    return product
}