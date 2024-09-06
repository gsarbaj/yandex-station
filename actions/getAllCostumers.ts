'use server'

import {db} from "@/db";

export async function getAllCostumers() {

    const costumers = await db.costumer.findMany({
        select: {
            phone_number: true
        }
    })
    return [...costumers];
}