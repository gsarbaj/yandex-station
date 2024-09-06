import * as actions from '@/actions'
import MainNavBar from "@/components/nav-bars/MainNavBar";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {toMoney} from "@/util/toMoney";


export default async function OrderPage({params}: any) {

    const order = await actions.getOrderByHash(params.idHash)

    let paymentMethod: string;
    let orderDate: string = order?.created_at.toISOString().split('T')[0] as string
    let productPrice: string = toMoney(order?.order_price as number).priceRegular + '\u20AC'
    let productTitle: string = `${order?.product[0].title} (${order?.product[0].sku})`

    switch (order?.Payment[0].payment_type) {
        case 'CASH':
            paymentMethod = 'Наличные при получении';
            break;
        case 'SWEDBANK':
            paymentMethod = 'Безналичный расчет Swedbank';
            break;
        case 'REVOLUT':
            paymentMethod = 'Безналичный расчет';
            break;
        case 'CARD':
            paymentMethod = 'Безналичный расчет';
            break;
        default:
            paymentMethod = 'Наличные при получении';
            break;
    }


    // @ts-ignore
    return (<>
            <MainNavBar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4 sm:p-6">
                <Card className="w-full max-w-xl">
                    <CardHeader className="bg-black text-primary-foreground p-6 rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold">Заказ подтвержден</CardTitle>
                                <CardDescription className="text-sm">Спасибо за покупку!</CardDescription>
                            </div>
                            <CircleCheckIcon className="w-10 h-10"/>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div className="font-medium">Информация о Заказе</div>
                                <div className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Номер Заказа</span>
                                        <span>1732{order?.id}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Дата</span>
                                        <span>{orderDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Способ Оплаты</span>
                                        {/*@ts-ignore*/}
                                        <span>{paymentMethod}</span>
                                    </div>
                                </div>
                            </div>
                            <Separator/>
                            <div className="grid gap-2">
                                <div className="font-medium">Приобретенные Товары</div>
                                <div className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="font-medium">{productTitle}</div>
                                                <div className="text-sm text-muted-foreground">Колличество: 1</div>
                                            </div>
                                        </div>
                                        <div className="font-medium">{productPrice}</div>
                                    </div>
                                </div>
                            </div>
                            <Separator/>
                            <div className="grid gap-2">
                                <div className="font-medium">Общий Итог Заказа</div>
                                <div className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Товаров</span>
                                        <span>{productPrice}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Доставка</span>
                                        <span>{`0.00\u20AC`}</span>
                                    </div>
                                    <div className="flex items-center justify-between font-medium">
                                        <span>Всего</span>
                                        <span>{productPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-muted/50 p-6 rounded-b-lg">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
                            prefetch={false}
                        >
                            Вернуться на Главную
                        </Link>
                        <Button variant="outline" size="lg">
                            Распечатать
                        </Button>
                    </CardFooter>
                </Card>
            </div>


        </>);
};


// created on 07/08/2024 12:15


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PWucQ4H5mKs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


function CircleCheckIcon(props: any) {
    return (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
        </svg>)
}