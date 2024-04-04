"use client"

import Link from "next/link"
// import midi from '@/public/pic/yandex-station-mini-black-01-600x600.webp'
import midi from '@/public/pic/FxKaJzRBjgzQ19lnu5cCU-transformed.webp'
import mini from '@/public/pic/yandex-station-mini-black-01-600x600.webp'
import stancija2 from '@/public/pic/stancija_2.webp'
import max from '@/public/pic/max.webp'
import lite from '../../public/pic/lite.png'



import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import Image from "next/image";

const components: { title: string; href: string; description: string, pic: any }[] = [

    {
        title: "Миди",
        href: "/midi",
        description: "Новые возможности Алисы в компактном корпусе",
        pic: midi
    },
    {
        title: "Станция 2",
        href: "/second",
        description: "Умная колонка с лаконичным дизайном и чистым звуком.",
        pic: stancija2
    },
    {
        title: "Макс",
        href: "/max",
        description: "Четыре новых оттенка самой мощной умной колонки",
        pic: max
    },

    // {
    //     title: "Мини",
    //     href: "/mini",
    //     description: "Вторая версия компактной колонки с Алисой — звук в три раза мощнее и лаконичный дизайн",
    //     pic: mini
    // },
    {
        title: "Мини",
        href: "/mini",
        description: "Вторая версия звук в три раза мощнее и лаконичный дизайн",
        pic: mini
    },
    {
        title: "Лайт",
        href: "/lite",
        description: "Самая яркая и компактная колонка с Алисой",
        pic: lite
    },

]

export default function MainNavBar() {

    return (
        <nav className={'flex items-center justify-center gap-2 m-2 sticky mx-auto p-3'}>
        <NavigationMenu>
            <NavigationMenuList >
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Станции</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <div className={'flex'} key={component.title}>

                                    <div className={'flex items-center justify-center'}>
                                        <Link href={component.href} prefetch>
                                            <Image  placeholder={'blur'} width={120} height={120} src={component.pic} alt={component.title || 'Яндекс станция'}/>
                                        </Link>

                                    </div>

                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}

                                    </ListItem>

                                </div>

                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Доставка
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Оплата
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Контакты
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </nav>
    )
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">

    // @ts-ignore
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>

            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"






// 'use client'
//
// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
//
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuIndicator,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger, navigationMenuTriggerStyle,
//     NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"
// import Link from "next/link";
//
//
//
// const MainNavBar = () => {
//
//     return (
//         <div className={'flex items-center justify-center gap-2 m-2'}>
//         <nav>
//             <NavigationMenu>
//                 <NavigationMenuList>
//
//                     <NavigationMenuItem>
//                         <Link href={"/admin"} legacyBehavior passHref>
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Калонки
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>
//
//                     <NavigationMenuItem>
//                         <Link href={"/admin/products"} legacyBehavior passHref>
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Оплата
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>
//
//                     <NavigationMenuItem>
//                         <Link href={"/admin/products"} legacyBehavior passHref>
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Доставка
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>
//
//                     <NavigationMenuItem>
//                         <Link href={"/admin/orders"} legacyBehavior passHref>
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Контакты
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>
//                 </NavigationMenuList>
//             </NavigationMenu>
//         </nav>
//         </div>
//     );
// };
//
// export default MainNavBar;