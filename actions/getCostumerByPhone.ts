'use server'

import {db} from "@/db";

export async function getCostumerByPhone(phone: string) {

    const costumer = await db.costumer.findFirst({
        where: {
            phone_number: phone
        }
    })

    return costumer;
}