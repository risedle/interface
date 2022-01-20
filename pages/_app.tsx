import type { AppProps } from "next/app";
import { Wallet } from "../components/v1/Wallet";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function RisedleApp({ Component, pageProps }: AppProps) {
    return (
        <Wallet>
            <Component {...pageProps} />
        </Wallet>
    );
}
export default RisedleApp;
