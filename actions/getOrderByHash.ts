'use server'

import {db} from "@/db";

export const getOrderByHash = async (idHash: string) => {



    const order = await db.order.findFirst({
        where: {
            idHash
        },
        include: {
            product: true,
            Payment: true
        }
    })

    console.log(order);

    return order
}


// created on 07/08/2024 12:32