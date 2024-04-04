"use client"

import { ColumnDef } from "@tanstack/react-table"

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
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "title",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Price</div>,
        cell: ({ row }) => {
            const amount = parseInt(row.getValue("price"))/100
            const formatted = new Intl.NumberFormat("lt-LT", {
                style: "currency",
                currency: "EUR",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock_qty",
        header: "Quantity",
    },
    {
        accessorKey: "revolut_link",
        header: "Revolut",
    },
    {
        accessorKey: "swedbank_link",
        header: "Swedbank",
    },
]