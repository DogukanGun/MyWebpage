"use client"

import { FeedbackProvider } from "@/context/FeedbackContext";
import { HTMLProps } from "react";
import Footer from "./footer";
import Navbar from "./navbar";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <FeedbackProvider>
            <Navbar />
            {children}
            <Footer />
        </FeedbackProvider>
    );
}