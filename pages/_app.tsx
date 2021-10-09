import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { DAppProvider, ChainId } from "@usedapp/core";

function RisedleApp({ Component, pageProps }: AppProps) {
    // Get the Kovan URL from .env file
    let kovanURL = "";
    if (process.env.NEXT_PUBLIC_KOVAN_URL) {
        kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
    }
    const config = {
        supportedChains: [ChainId.Kovan],
        readOnlyChainId: ChainId.Kovan,
        readOnlyUrls: {
            [ChainId.Kovan]: kovanURL,
        },
    };

    // Simulate inside app page
    return (
        <DAppProvider config={config}>
            <Component {...pageProps} />;
        </DAppProvider>
    );
}
export default RisedleApp;
