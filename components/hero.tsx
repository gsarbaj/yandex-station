import React from 'react';
import Image from "next/image";

import heroImg from '@/public/pic/yandex-station-mini-black-01-600x600.webp'
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const Hero = () => {

    return (
        <section>
            <div className={'container flex flex-col-reverse mx-auto p-6 lg:flex-row xl:flex-row'}>
                <div className={'flex flex-col space-y-6 mb-44 lg:mt-16 lg:w-1/2'}>

                    <h1 className={'text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-right'}>Яндекс
                        Cтанция в Висагинасе</h1>
                    <p className={'text-2xl text-center text-gray-400 lg:max-w-md lg:text-right'}>Здесь можно купить или
                        заказать Яндекс Станцию в Висагинасе</p>
                    <div className={'mx-auto lg:mx-0 flex justify-center gap-3'}>
                        <Link prefetch href={'/'} className={buttonVariants({variant: "outline", size: "lg"})}>Смотреть Все</Link>
                        <Link prefetch href={'/'} className={buttonVariants({variant: "default", size: "lg"})}>Купить</Link>
                    </div>
                </div>
                <div className={'mb-4 mx-auto md:w-180 lg:mb-0 lg:w-1/2'}>
                    <Image className={'lg:-m-16'} src={heroImg} alt={'Яндекс колонка в Висагинасе'}/>
                </div>
            </div>
        </section>
    );
};

export default Hero;