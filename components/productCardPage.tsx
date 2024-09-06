import React from 'react';
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import BuyPageForm from "@/components/forms/BuyPageForm";

import {toMoney} from "@/util/toMoney";

interface ProductCardProps {
    title: string,
    description: string,
    price: number,
    link: string,
    picture: any,
    index: number
}


const ProductCardPage = ({title, description, price, link, picture, index}: ProductCardProps) => {

    // console.log(price);

    let divClass = 'flex flex-col p-6 m-3 space-y-10 rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16'


    // @ts-ignore
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

                    <div className={'flex flex-row gap-2'}>
                        <div>
                            <div className={'text-2xl font-medium lg:text-3xl'}>{title}</div>
                            <p className={'font-light text-gray-400'}>{description}</p>
                        </div>

                        <div>
                            {/*  Price  */}
                            <div className={'flex flex-col mb-4 space-y-3 text-center md:text-left'}>

                                <p className={'line-through'}>{toMoney(price).priceBefore} <span>&#8364;</span>
                                </p>
                                <p className={'text-2xl font-bold md:text-5xl'}>{toMoney(price).priceRegular}<span>&#8364;</span>
                                </p>
                            </div>
                        </div>

                    </div>


                </div>

                <BuyPageForm product={link} price={price} title={title}/>


            </div>

        </div>
    );
};

export default ProductCardPage;