import { FunctionComponent, ReactNode } from "react";
import createPersistedState from "use-persisted-state";
import { Chain, Provider, chain as Chains } from "wagmi";
import { createContext, useContext } from "react";
import { ethers, providers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const connectorStorageKey = "risedleConnectors.wallet";

// export const supportedChains = [Chains.arbitrumOne, Chains.kovan];
export const supportedChains = [Chains.kovan];

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
// export const ArbitrumOneProvider = new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj");
// export const KovanProvider = new ethers.providers.JsonRpcProvider("https://eth-kovan.alchemyapi.io/v2/qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-");

export const ArbitrumOneProvider = new providers.AlchemyProvider(Chains.arbitrumOne.id, "qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj");
export const KovanProvider = new providers.AlchemyProvider(Chains.kovan.id, "qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-");
export const Providers = {
    [Chains.kovan.id]: KovanProvider,
    [Chains.arbitrumOne.id]: ArbitrumOneProvider,
};

type WalletProps = {
    children: ReactNode;
};

// Persistent states
const useChainState = createPersistedState("risedle.chain");
const useAccountState = createPersistedState("risedle.account");
const useConnectorNameState = createPersistedState("risedle.connectorName");

// Default states
const defaultChain = Chains.kovan;
const defaultAccount = null; // null is not connected
const defaultConnectorName = null;

export type WalletStates = {
    chain: Chain;
    switchChain: (c: number) => void;
    account: string | null;
    login: (a: string) => void;
    logout: () => void;
    connectorName: string | null;
    setConnectorName: (n: string | null) => void;
};

// Global wallet context
const WalletContext = createContext<WalletStates>({
    chain: defaultChain,
    switchChain: (c: number) => {},
    account: defaultAccount,
    login: (a: string) => {},
    logout: () => {},
    connectorName: defaultConnectorName,
    setConnectorName: (n: string | null) => {},
});

export const Wallet: FunctionComponent<WalletProps> = ({ children }) => {
    const [chain, setChain] = useChainState<Chain>(defaultChain);
    const [account, setAccount] = useAccountState<string | null>(defaultAccount);
    const [connectorName, setConnectorName] = useConnectorNameState<string | null>(defaultConnectorName);

    // Debugs
    console.debug("Wallet chain", chain);
    console.debug("Wallet account", account);
    console.debug("Wallet connectorName", connectorName);

    // Utilities
    const switchChain = (id: number) => {
        switch (id) {
            case Chains.arbitrumOne.id:
                setChain(Chains.arbitrumOne);
                break;
            case Chains.kovan.id:
                setChain(Chains.kovan);
                break;
            default:
                throw Error("Chain is not supported");
        }
    };

    const getProvider = () => {
        switch (chain.id) {
            case Chains.kovan.id:
                return KovanProvider;
            case Chains.arbitrumOne.id:
                return ArbitrumOneProvider;
            default:
                return ethers.getDefaultProvider();
        }
    };

    // Login and logout functionalities
    const login = (a: string) => {
        setAccount(a);
    };
    const logout = () => {
        setAccount(null);
    };

    const sharedPersistentStates = {
        chain: chain,
        switchChain: switchChain,
        account: account,
        login: login,
        logout: logout,
        connectorName: connectorName,
        setConnectorName: setConnectorName,
    };

    return (
        <WalletContext.Provider value={sharedPersistentStates}>
            <Provider autoConnect={true} connectorStorageKey={connectorStorageKey} connectors={[MetaMaskConnector, WCConnector]} provider={getProvider}>
                {children}
            </Provider>
        </WalletContext.Provider>
    );
};

export function useWalletContext() {
    return useContext(WalletContext);
}
