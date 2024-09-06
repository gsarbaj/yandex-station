'use server'

import {db} from "@/db";

// @ts-ignore
export async function getProductById({id}: number | null) {

    const product_id = parseInt(id)

    const product = await db.product.findUnique({
        where: {
            id: product_id
        }
    })

    return product
}