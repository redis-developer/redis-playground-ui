/* eslint-disable @next/next/no-page-custom-font */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';

import './common/css/typography.scss';
import './common/css/variables.scss';
import './common/css/redis-core.scss';
import './common/css/theme-redis.scss';
import './common/css/anime.scss';

import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';

import GoogleTagManager from "./components/GoogleTagManager";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redis Playground",
  description: "Play with raw Redis commands",
};
const GTM_ID = "GTM-TKZ6J9R";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="/fontawesome-free-6.6.0-web/css/all.min.css" /> */}
      </head>
      <body className={`${inter.className} theme-redis font-regular`}>
        <GoogleTagManager gtmId={GTM_ID} />

        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
