import type { AppProps } from "next/app";
import { Wallet } from "../components/v1/Wallet";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function RisedleApp({ Component, pageProps }: AppProps) {
    return (
        <Wallet>
            <Toaster position="top-center" />
            <Component {...pageProps} />
        </Wallet>
    );
}
export default RisedleApp;
