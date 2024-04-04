import {Product, columns} from "./columns"
import {ProductsTable} from "@/components/tables/ProductsTable";
import {db} from "@/db";
import AddProductButton from "@/components/buttons/AddProductButton";


export const dynamic = 'force-dynamic'

async function getData(): Promise<Product[]> {


    const products = await db.product.findMany()

    // @ts-ignore
    return [...products]
}

export default async function ProductPage() {

    const data = await getData()


    return (
        <>
            <AddProductButton/>

            <div className="container mx-auto py-10">
                <ProductsTable columns={columns} data={data}/>
            </div>


        </>

    )
}
