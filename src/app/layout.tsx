/* eslint-disable @next/next/no-page-custom-font */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';

import './common/css/typography.scss';
import './common/css/variables.scss';
import './common/css/theme.scss';
import './common/css/anime.scss';

import "./globals.scss";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redis Playground",
  description: "Play with raw Redis commands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/fontawesome-free-6.6.0-web/css/all.min.css" />
      </head>
      <body className={`${inter.className} theme-custom-component font-regular`}>
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
