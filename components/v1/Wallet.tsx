import { FunctionComponent, ReactNode, useState } from "react";

import { Provider } from "wagmi";

import { createContext, useContext } from "react";

import { ethers } from "ethers";
import { chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const connectorStorageKey = "risedleConnectors.wallet";

export const supportedChains = [chain.arbitrumOne, chain.kovan];

export const RisedleConnectors = [
    new InjectedConnector({ chains: supportedChains }),
    new WalletConnectConnector({
        chains: supportedChains,
        options: {
            qrcode: true,
        },
    }),
];

// Providers
export const ArbitrumOneProvider = new ethers.providers.JsonRpcProvider(
    "https://arb-mainnet.g.alchemy.com/v2/qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj"
);
export const KovanProvider = new ethers.providers.JsonRpcProvider(
    "https://eth-kovan.alchemyapi.io/v2/qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-"
);

// Global wallet context
const WalletContext = createContext({
    network: chain.arbitrumOne,
    setNetwork: (chainId: number) => {},
    provider: ArbitrumOneProvider,
    setProvider: (chainId: number) => {},
    supportedChains: supportedChains,
});

type WalletProps = {
    children: ReactNode;
};

export const Wallet: FunctionComponent<WalletProps> = ({ children }) => {
    // Global states
    const [provider, setProvider] = useState(ArbitrumOneProvider);
    const [network, setNetwork] = useState(chain.arbitrumOne);

    const setProviderUsingChainID = (chainId: number) => {
        switch (chainId) {
            case chain.arbitrumOne.id:
                setProvider(ArbitrumOneProvider);
                break;
            case chain.kovan.id:
                setProvider(KovanProvider);
                break;
            default:
                throw Error(
                    `setProviderUsingChainID: Chain ID ${chainId} is not supported`
                );
        }
    };

    // Setting network also change the provider
    const setNetworkUsingChainID = (chainId: number) => {
        switch (chainId) {
            case chain.arbitrumOne.id:
                setNetwork(chain.arbitrumOne);
                setProvider(ArbitrumOneProvider);
                break;
            case chain.kovan.id:
                setNetwork(chain.kovan);
                setProvider(KovanProvider);
                break;
            default:
                throw Error(
                    `setNetworkUsingChainID: Chain ID ${chainId} is not supported`
                );
        }
    };

    const defaultValue = {
        network: network,
        setNetwork: setNetworkUsingChainID,
        provider: provider,
        setProvider: setProviderUsingChainID,
        supportedChains: supportedChains,
    };
    return (
        <WalletContext.Provider value={defaultValue}>
            <Provider
                connectorStorageKey={connectorStorageKey}
                connectors={RisedleConnectors}
                provider={provider}
            >
                {children}
            </Provider>
        </WalletContext.Provider>
    );
};

export function useWalletContext() {
    return useContext(WalletContext);
}
