import type { AppProps } from "next/app";
import { Wallet } from "../components/v1/Wallet";
import * as Toast from "@radix-ui/react-toast";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useToastStore } from "../store/ToastStore";

function RisedleApp({ Component, pageProps }: AppProps) {
    const toastStore = useToastStore();
    return (
        <Toast.Provider>
            {toastStore.toast.map((data) => data.toast)}
            {console.log(toastStore.toast)}
            <Wallet>
                {/* <Toaster position="top-center" toastOptions={{ duration: 3000 }} /> */}
                <Component {...pageProps} />
            </Wallet>
        </Toast.Provider>
    );
}
export default RisedleApp;
