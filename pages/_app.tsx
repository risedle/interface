import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Wallet } from "../components/v1/Wallet";
import "../styles/globals.css";

function RisedleApp({ Component, pageProps }: AppProps) {
    return (
        <Wallet>
            <Component {...pageProps} />
        </Wallet>
    );
}
export default RisedleApp;
