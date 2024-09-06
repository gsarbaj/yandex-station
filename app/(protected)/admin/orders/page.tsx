import {Order, columns} from "./columns"
import {db} from "@/db";
import {OrderTable} from "@/app/(protected)/admin/orders/data-table";
import {revalidatePath} from "next/cache";
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import {getData} from "@/actions";


export const dynamic = 'force-dynamic'

async function getTableData(): Promise<Order[]> {


    const orders = await db.order.findMany({
        include: {
            product: {
                select: {
                    sku: true
                }
            },
            costumer: {
                select: {
                    phone_number: true
                }
            }
        }
    })


    // @ts-ignore
    return [...orders]
}


export default async function OrderPage() {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['data'],
        queryFn: getData,
    })

    const tableData: Order[] = await getTableData().finally(() => revalidatePath('/admin/orders/'))
    // console.log("DATA PAGE ", data);

    const date_options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}

    const modified_data = [...tableData].map((order) => {

        // @ts-ignore
        order.created_at = order.created_at.toLocaleDateString('lt-LT', date_options).toString()
    })


    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="container mx-auto py-10">
                    <OrderTable columns={columns} data={tableData}/>
                </div>
            </HydrationBoundary>
        </>

    )
}

