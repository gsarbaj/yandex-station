"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {useRouter, useSearchParams} from "next/navigation";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: number
    sku: string
    title: string
    description: string
    price: number
    revolut_link: string
    swedbank_link: string
    stock_qty: number
    slug: string
}


export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "sku",
        header: "SKU",
        cell: ({row}) => {
            const link = row.getValue('sku')

            // @ts-ignore
            return <div className={''}>{link}</div>
        }
    },
    {
        accessorKey: "slug",
        header: "Slug",
        cell: ({row}) => {
            const link = row.getValue('slug')

            // @ts-ignore
            return <div className={''}>{link}</div>
        }
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const link = row.getValue('title')

            // @ts-ignore
            return <div className={'max-w-24 overflow-hidden whitespace-nowrap text-ellipsis'}>{link}</div>
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => {
            const link = row.getValue('description')

            // @ts-ignore
            return <div className={'max-w-24 overflow-hidden whitespace-nowrap text-ellipsis'}>{link}</div>
        }

    },
    {
        accessorKey: "stock_qty",
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
            const link = row.getValue('stock_qty')

            // @ts-ignore
            return <div className={'text-center'}>{link}</div>
        }
    },
    {
        accessorKey: "price",
        // header: () => <div className="text-center">Price</div>,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const amount = parseInt(row.getValue("price")) / 100
            const formatted = new Intl.NumberFormat("lt-LT", {
                style: "currency",
                currency: "EUR",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },

    {
        accessorKey: "revolut_link",
        header: "Revolut",
        cell: ({row}) => {
            const link = row.getValue('revolut_link')

            // @ts-ignore
            return <div className={'max-w-24 overflow-hidden whitespace-nowrap text-ellipsis'}>{link}</div>
        }
    },
    {
        accessorKey: "swedbank_link",
        header: "Swedbank",
        cell: ({row}) => {
            const link = row.getValue('swedbank_link')

            // @ts-ignore
            return <div className={'max-w-24 overflow-hidden whitespace-nowrap text-ellipsis'}>{link}</div>
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const product = row.original

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
                                {/*<Link href={'/'}>Edit Product</Link>*/}

                                <div onClick={() => {
                                    router.push(`?product_id=${product.id}&edit_product=open&sku=${product.sku}&title=${product.title}&description=${product.description}&quantity=${product.stock_qty}&slug=${product.slug}&price=${product.price}&slink=${product.swedbank_link}&rlink=${product.revolut_link}`)
                                }}>Edit Product
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Add to Stock</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]