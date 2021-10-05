import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { DAppProvider, ChainId } from "@usedapp/core";

function RisedleApp({ Component, pageProps }: AppProps) {
    // Get the rinkeby URL from .env file
    let rinkebyURL = "";
    if (process.env.NEXT_PUBLIC_RINKEBY_URL) {
        rinkebyURL = process.env.NEXT_PUBLIC_RINKEBY_URL;
    }
    const config = {
        readOnlyChainId: ChainId.Rinkeby,
        readOnlyUrls: {
            [ChainId.Rinkeby]: rinkebyURL,
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
