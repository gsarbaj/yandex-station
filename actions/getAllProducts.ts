'use server'

import {db} from "@/db";

export async function getAllProducts() {

    const products = await db.product.findMany({
        select: {
            sku: true,
            price: true
        }
    })
    return [...products];
}