import MainNavBar from "@/components/nav-bars/MainNavBar";
import Hero from "@/components/hero";
import ProductCard from "@/components/productCard";

import midi from '@/public/pic/FxKaJzRBjgzQ19lnu5cCU-transformed.webp'
import mini from '@/public/pic/yandex-station-mini-black-01-600x600.webp'
import nowatch from '@/public/pic/nowatch.png'
import stancija2 from '@/public/pic/stancija_2.webp'
import max from '@/public/pic/max.webp'
import lite from '@/public/pic/lite.png'



const data = [
  {
    title: "Яндекс Станция Миди",
    description: "Умная колонка с лаконичным дизайном. Новые возможности Алисы в компактном корпусе",
    price: 28000,
    link: '/midi',
    picture: midi
  },
    {
        title: "Яндекс Станция второго поколения",
        description: "Умная колонка с лаконичным дизайном и чистым звуком станет центром вашего умного дома с Алисой",
        price: 30000,
        link: '/station-gen2',
        picture: stancija2
    },
    {
        title: "Яндекс Мини второго поколения с часами",
        description: "Вторая версия компактной колонки с Алисой — звук в три раза мощнее и лаконичный дизайн",
        price: 16000,
        link: '/mini',
        picture: mini
    },
    {
        title: "Яндекс Мини второго поколения без часов",
        description: "Вторая версия компактной колонки с Алисой — звук в три раза мощнее и лаконичный дизайн",
        price: 14000,
        link: '/mini-nowatch',
        picture: nowatch
    },
    {
        title: "Яндекс Станция Лайт",
        description: "Умная колонка с лаконичным дизайном. Самая яркая и компактная колонка с Алисой",
        price: 10500,
        link: '/lite',
        picture: lite
    },

]

export default function Home() {

    const productsRender = data.map((product) => { // @ts-ignore
        return (
        <div key={data.indexOf(product)}>
            <ProductCard index={data.indexOf(product)} title={product.title} description={product.description} price={product.price} link={product.link} picture={product.picture}/>
        </div>

    )})


    return (
      <main className={''}>

        <MainNavBar/>
        <Hero/>
          {productsRender}





    </main>
  );
}
