import './app.css'
import React from "react";
import {useRouter} from "next/router";
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Script from "next/script.js";

interface Props extends AppProps {
    Component: NextPage;
}

export default function MyApp({ Component, pageProps }: Props) {
    const router = useRouter()

    return (
        <>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-85B8CW1R8E"/>
            <Script
                id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                             function gtag(){
                             dataLayer.push(arguments);
                             }
                             gtag('js', new Date());
                             gtag('config', 'G-85B8CW1R8E', {
                             page_path: window.location.pathname,
                             });`
                }}
            />
            <Component key={router.asPath} {...pageProps}/>
        </>
    )
}
