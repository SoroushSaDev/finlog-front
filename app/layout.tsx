import type {Metadata} from "next";
import {Outfit, Quicksand} from "next/font/google";
import "./globals.css";
import React from "react";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
});

const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "FinLog",
    description: "Your smart finance tracker",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${outfit.variable} ${quicksand.variable} antialiased font-quicksand`}
        >
        {children}
        </body>
        </html>
    );
}
