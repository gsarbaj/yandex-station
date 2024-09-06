import {notFound} from "next/navigation";
import MainNavBar from "@/components/nav-bars/MainNavBar";
import {db} from '@/db'
import type {Metadata} from "next";
import ProductCardPage from "@/components/productCardPage";

import midi from '@/public/pic/FxKaJzRBjgzQ19lnu5cCU-transformed.webp'
import mini from '@/public/pic/yandex-station-mini-black-01-600x600.webp'
import nowatch from '@/public/pic/nowatch.png'
import stancija2 from '@/public/pic/stancija_2.webp'
import max from '@/public/pic/max.webp'
import lite from '@/public/pic/lite.png'


export const metadata: Metadata = {
    title: "Яндекс Станция в Висагинасе",
    description: "Здесь можно купить или заказать яндекс станцию в Висагинасе",
};


interface ProductOrderPageProps {
    params: {
        slug: string
    }
}

const pictures: any = {
    'midi': midi,
    'station-gen2': stancija2,
    'mini': mini,
    'mini-nowatch': nowatch,
    'lite': lite
}




export default async function ProductOrderPage(props: ProductOrderPageProps) {


    const product = await db.product.findFirst({
        where: {
            slug: props.params.slug
        }
    })

    if (!product) {
        return notFound()
    }

    // console.log(pictures[product.slug])


    return (
        <>
            <MainNavBar/>
            <ProductCardPage title={product.title} description={product.description} price={product.price || 0}
                             link={product.slug} picture={pictures[product.slug]} index={product.id}/>
        </>
    );
};
