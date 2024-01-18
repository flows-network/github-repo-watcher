// pages/_document.js

import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800"
                    rel="stylesheet"
                />
                <meta name="google-site-verification" content="2Y6wUPzRh4Dz8-Eq23crRhLnt0KvcRKAcTi1ZvHnBKg" />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
