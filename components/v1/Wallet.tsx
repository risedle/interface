import { FunctionComponent, ReactNode } from "react";
import createPersistedState from "use-persisted-state";

import { Chain, Provider, chain as Chains } from "wagmi";

import { createContext, useContext } from "react";

import { ethers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { BaseProvider } from "@ethersproject/providers";

export const connectorStorageKey = "risedleConnectors.wallet";

export const supportedChains = [Chains.arbitrumOne, Chains.kovan];

// Wallet connectors
export const MetaMaskConnector = new InjectedConnector({
    chains: supportedChains,
});

export const WCConnector = new WalletConnectConnector({
    chains: supportedChains,
    options: {
        qrcode: true,
    },
});

// Providers
export const ArbitrumOneProvider = new ethers.providers.JsonRpcProvider(
    "https://arb-mainnet.g.alchemy.com/v2/qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj"
);
export const KovanProvider = new ethers.providers.JsonRpcProvider(
    "https://eth-kovan.alchemyapi.io/v2/qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-"
);

type WalletProps = {
    children: ReactNode;
};

// Persistent states
const useChainState = createPersistedState("risedle.chain");
const useProviderState = createPersistedState("risedle.provider");
const useAccountState = createPersistedState("risedle.account");
const useConnectorNameState = createPersistedState("risedle.connectorName");

// Default states
const defaultChain = Chains.kovan;
const defaultProvider = KovanProvider;
const defaultAccount = null; // null is not connected
const defaultConnectorName = null;

export type WalletStates = {
    chain: Chain | null;
    switchChain: (c: number) => void;
    account: string | null;
    setAccount: (a: string | null) => void;
    connectorName: string | null;
    setConnectorName: (n: string | null) => void;
};

// Global wallet context
const WalletContext = createContext<WalletStates>({
    chain: defaultChain,
    switchChain: (c: number) => {},
    account: defaultAccount,
    setAccount: (a: string | null) => {},
    connectorName: defaultConnectorName,
    setConnectorName: (n: string | null) => {},
});

export const Wallet: FunctionComponent<WalletProps> = ({ children }) => {
    const [chain, setChain] = useChainState<Chain | null>(defaultChain);
    const [provider, setProvider] =
        useProviderState<BaseProvider>(defaultProvider);
    const [account, setAccount] = useAccountState<string | null>(
        defaultAccount
    );
    const [connectorName, setConnectorName] = useConnectorNameState<
        string | null
    >(defaultConnectorName);

    // Debugs
    console.debug("Wallet chain", chain);
    console.debug("Wallet provider", provider);
    console.debug("Wallet account", account);
    console.debug("Wallet connectorName", connectorName);

    const switchChain = (chainID: number) => {
        switch (chainID) {
            case Chains.kovan.id:
                setChain(Chains.kovan);
                setProvider(KovanProvider);
                return;
            case Chains.arbitrumOne.id:
                setChain(Chains.arbitrumOne);
                setProvider(ArbitrumOneProvider);
                return;
            default:
                setChain(null);
                setProvider(ethers.getDefaultProvider());
                return;
        }
    };

    // Listen to connector events
    MetaMaskConnector.on("connect", (data) => {
        console.debug("Metamask connected");
        console.debug(data);
        // Handle switch account or switch network on metamask
        if (data.account) {
            setAccount(data.account);
        }
        if (data.chain) {
            switchChain(data.chain.id);
        }
    });
    MetaMaskConnector.on("disconnect", () => {
        console.debug("Metamask disconnect");
        setAccount(null);
    });
    MetaMaskConnector.on("change", (data) => {
        console.debug("Metamask changed");
        console.debug(data);
        // Handle switch account or switch network on metamask
        if (data.account) {
            setAccount(data.account);
        }
        if (data.chain) {
            switchChain(data.chain.id);
        }
    });
    WCConnector.on("connect", (data) => {
        console.debug("WalletConnect connected");
        // Handle switch account or switch network on metamask
        if (data.account) {
            setAccount(data.account);
        }
        if (data.chain) {
            switchChain(data.chain.id);
        }
    });
    WCConnector.on("disconnect", () => {
        setAccount(null);
    });
    WCConnector.on("change", (data) => {
        console.debug("WalletConnect change");
        // Handle switch account or switch network on wallet connect
        if (data.account) {
            setAccount(data.account);
        }
        if (data.chain) {
            switchChain(data.chain.id);
        }
    });

    const sharedPersistentStates = {
        chain: chain,
        switchChain: switchChain,
        account: account,
        setAccount: setAccount,
        connectorName: connectorName,
        setConnectorName: setConnectorName,
    };

    return (
        <WalletContext.Provider value={sharedPersistentStates}>
            <Provider
                autoConnect={true}
                connectorStorageKey={connectorStorageKey}
                connectors={[MetaMaskConnector, WCConnector]}
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
