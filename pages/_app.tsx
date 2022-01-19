import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import { Provider, chain } from 'wagmi'
import { providers } from "ethers";

// Import wallet connectors 
import { injected_connector, getWCConnector } from "../config/WalletConnectorsConfig";

function RisedleApp({ Component, pageProps }: AppProps) {
    // Get the Kovan URL from .env file
    let kovanURL = "";
    if (process.env.NEXT_PUBLIC_KOVAN_URL) {
        kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
    }

    let arbitrumURL = "";
    if (process.env.NEXT_PUBLIC_ARBITRUM_URL) {
        arbitrumURL = process.env.NEXT_PUBLIC_ARBITRUM_URL;
    }

    // Config for useDApp provider
    const config = {
        supportedChains: [chain.kovan.id, chain.arbitrumOne.id],
        readOnlyChainId: chain.kovan.id,
        readOnlyUrls: {
            [chain.kovan.id]: kovanURL,
            [chain.arbitrumOne.id]: arbitrumURL
        },
    };

    // Providers for wagmi
    const kovanProvider = () => new providers.JsonRpcProvider(kovanURL, chain.kovan.id)
    const arbitrumProvider = () => new providers.JsonRpcProvider(arbitrumURL, chain.arbitrumOne.id);

    const wc_kovan = getWCConnector(chain.kovan.id)
    const wc_arbitrum = getWCConnector(chain.arbitrumOne.id)

    // Get all Wallet Connectors
    // Note: WalletConnect connector must be defined for each supported network
    const connectors = [
        injected_connector,
        wc_kovan,
        wc_arbitrum
    ]

    // Simulate inside app page
    return (
        <DAppProvider config={config}>
            <Provider 
                autoConnect
                connectorStorageKey="wagmi_connector"
                connectors={connectors}
                provider={kovanProvider}
            >
                <Component {...pageProps} />;
            </Provider>
        </DAppProvider>
    );
}
export default RisedleApp;