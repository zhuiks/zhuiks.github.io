import React from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import '../styles/globals.css'

function ZApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps } />
}

export default ZApp