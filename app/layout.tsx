
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";


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
      <body className={inter.className}>

          {children}
          <Toaster />

      </body>
    </html>
  );
}