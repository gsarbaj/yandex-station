
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import PlausibleProvider from "next-plausible";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Яндекс Станция в Висагинасе",
  description: "Здесь можно купить или заказать яндекс станцию в Висагинасе",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">

    <head>
        <PlausibleProvider domain={"kolonka.eu"}/>
    </head>

      <body className={inter.className}>

          {children}
          <Toaster />

      </body>
    </html>
  );
}