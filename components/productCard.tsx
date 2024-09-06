import React from 'react';
import Image from "next/image";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

interface ProductCardProps {
    title: string,
    description: string,
    price: number,
    link: string,
    picture: any,
    index: number
}


const ProductCard = ({title, description, price, link, picture, index}: ProductCardProps) => {

    let divClass = 'flex flex-col p-6 m-3 space-y-10 rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16'

    if ((index + 1) % 2 == 0) {
        divClass = 'flex flex-col p-6 m-3 space-y-10 rounded-2xl shadow-2xl md:flex-row-reverse md:space-y-0 md:space-x-10 md:m-0 md:p-16'
    }


    return (
        <div
            className={divClass}>

            <div>
                <Image className={'mx-auto duration-200 hover:scale-105'} src={picture} alt={"Станция 2"}/>
            </div>

            <div className={'flex flex-col space-y-6 justify-between'}>
                <div className={'flex flex-col mb-4 space-y-3 text-center md:text-left'}>
                    <div>


                        <Badge>доставка по Висагинасу бесплатно</Badge>

                    </div>

                    {/*     Title    */}
                    <div className={'text-2xl font-medium lg:text-3xl'}>{title}</div>
                    <p className={'font-light text-gray-400'}>{description}</p>
                </div>
                <div className={''}>
                    {/*  Price  */}

                    <div className={'flex flex-col mb-4 space-y-3 text-center md:text-left'}>
                        <p className={'line-through'}>{((price + 1900) / 100).toFixed(2)} <span>&#8364;</span></p>
                        <p className={'text-5xl font-bold'}>{(price / 100).toFixed(2)}<span>&#8364;</span></p>
                        <p className={'text-sm font-light text-gray-400'}>Оплатить можно картой, через Swedbank или
                            Revolut, а так-же наличными при получении</p>
                    </div>

                    {/*  Button Group  */}

                    <div className={'lg:mb-12'}>
                        <Link prefetch href={link}
                              className={buttonVariants({variant: "deffull", size: "lg",})}>Купить</Link>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default ProductCard;