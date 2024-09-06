"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {useRouter, useSearchParams} from "next/navigation";


export type Order = {
    id: number
    created_at: string
    sku: string
    product: string
    costumer: string
    order_price: number
    payment_received: number
    order_type: string
    order_state: string
    qty: number
    payment: string
}


export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={'max-w-xs'}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const link = row.getValue('id')

            // @ts-ignore
            return <div className={'max-w-8 text-center overflow-hidden whitespace-nowrap text-ellipsis'}>{link}</div>
        }

    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({row}) => {
            const link = row.getValue('created_at') as string

            // @ts-ignore
            return <div className={'text-left'}>{link}</div>
        }
    },

    {
        accessorKey: "order_type",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={'max-w-xs'}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const link = row.getValue('order_type')

            // @ts-ignore
            return <div className={'text-left'}>{link.toLowerCase()}</div>
        }

    },

    {
        accessorKey: "product",
        header: "Product",
        cell: ({row}) => {

            // @ts-ignore
            const link = row.getValue('product')[0].sku

            // @ts-ignore
            return <div className={''}>{link}</div>
        }
    },

    {
        accessorKey: "qty",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const link = row.getValue('qty')

            console.log('QTY ', link);

            // @ts-ignore
            return <div className={'text-center'}>{link}</div>
        }
    },
    {
        accessorKey: "order_price",
        // header: () => <div className="text-center">Price</div>,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Price
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            const amount = parseInt(row.getValue("order_price")) / 100
            const formatted = new Intl.NumberFormat("lt-LT", {
                style: "currency",
                currency: "EUR",
            }).format(amount)
            return <div className="text-center font-medium">{formatted}</div>
        },
    },

    {
        accessorKey: "payment_received",
        // header: () => <div className="text-center">Price</div>,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },

        cell: ({row}) => {
            // console.log(row.getValue("payment_received"))
            const amount = parseInt(row.getValue("payment_received")) / 100
            const formatted = new Intl.NumberFormat("lt-LT", {
                style: "currency",
                currency: "EUR",
            }).format(amount)
            return <div className="text-center font-medium">{formatted}</div>
        },
    },


    {
        accessorKey: "costumer",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Costumer
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

            // @ts-ignore
            const link = row.getValue('costumer').phone_number
            // @ts-ignore
            return <div className={'max-w-26 overflow-hidden '}>{link}</div>
        }
    },

    {
        accessorKey: "order_state",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={'max-w-xs'}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const link = row.getValue('order_state')

            // @ts-ignore
            return <div className={'max-w-8 text-right'}><Badge variant={'secondary'}>{link}</Badge></div>
        }

    },

    {
        id: "actions",
        cell: ({row}) => {
            const order = row.original
            {
                console.log("Row ", row.original)
            }

            const searchParams = useSearchParams()

            const router = useRouter()

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel></DropdownMenuLabel>

                            <DropdownMenuItem>
                                {/*<Link href={'/'}>Edit Order</Link>*/}

                                <div onClick={() => {

                                    // @ts-ignore
                                    router.push(`?edit_order=open&order_id=${order.id}&sku=${order.product[0].sku}&costumer=${order.costumer.phone_number}&state=${order.order_state}&note=${order.note}`)
                                }}>Edit Order
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Add Payment</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]