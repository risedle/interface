import { FunctionComponent, ReactNode } from "react";
import createPersistedState from "use-persisted-state";
import { Chain, Provider, chain as Chains, useAccount, useNetwork, useConnect, useSigner } from "wagmi";
import { createContext, useContext } from "react";
import { ethers, providers } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const connectorStorageKey = "risedleConnectors.wallet";

export const supportedChains = [Chains.arbitrumOne, Chains.kovan];
export const DEFAULT_CHAIN = Chains.arbitrumOne;

// Wallet connectors
export const MetaMaskConnector = new InjectedConnector({
    chains: supportedChains,
});

export const WCConnector = new WalletConnectConnector({
    chains: supportedChains,
    options: {
        infuraId: "71cabf633a8c44508d8504859131a1eb",
        qrcode: true,
    },
});

export const ArbitrumOneProvider = new providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/qu4tZ0JUekqqwtcDowbfel-s4S8Z60Oj", Chains.arbitrumOne.id);
export const KovanProvider = new providers.JsonRpcProvider("https://eth-kovan.alchemyapi.io/v2/qLbNN95iUDTpQqbm5FzgaSPrPJ908VD-", Chains.kovan.id);

export type WalletStates = {
    account: string | undefined;
    chain: { unsupported: Boolean; chain: Chain };
    connectWallet: (c: InjectedConnector | WalletConnectConnector) => Promise<any>;
    disconnectWallet: () => void;
    switchNetwork: ((chaindID: number) => Promise<any>) | undefined;
    signer: ethers.Signer | undefined;
    provider: ethers.providers.JsonRpcProvider;
};

const WalletContext = createContext<WalletStates>({
    account: undefined,
    chain: { unsupported: false, chain: DEFAULT_CHAIN },
    connectWallet: async (c: InjectedConnector | WalletConnectConnector) => {},
    disconnectWallet: () => {},
    switchNetwork: undefined,
    signer: undefined,
    provider: ArbitrumOneProvider,
});

// Persistent states
enum MetamaskState {
    Connected,
    NotConnected,
}
const useMatamaskState = createPersistedState("risedle.metamaskState"); // Persist disconnect state on metamask

type WalletGlobalStateProps = {
    children: ReactNode;
};

const getProvider = (config: { chainId?: number }) => {
    switch (config.chainId) {
        case Chains.kovan.id:
            return KovanProvider;
        case Chains.arbitrumOne.id:
            return ArbitrumOneProvider;
        default:
            return ArbitrumOneProvider;
    }
};

const WalletGlobalState: FunctionComponent<WalletGlobalStateProps> = ({ children }) => {
    // Read global states
    const [accountData, disconnect] = useAccount();
    const [, connect] = useConnect();
    const [networkData, switchNetwork] = useNetwork();
    const [signerData] = useSigner();

    // Metamask state, to persist the connect/disconnect status on metamask wallet
    const [metamaskState, setMetamaskState] = useMatamaskState(MetamaskState.NotConnected);

    // List of action that will change the global states
    // Connect wallet
    const connectWallet = async function (c: InjectedConnector | WalletConnectConnector) {
        try {
            const result = await connect(c);
            if (result && result.error) return result; // Return error early

            // Persist metamask connection state
            if (c.name === "MetaMask") {
                setMetamaskState(MetamaskState.Connected);
            }

            // Prevent connecting with WalletConnect if network is not right
            if (c instanceof WalletConnectConnector) {
                if (result?.data?.chain?.unsupported) {
                    disconnect();
                    return {
                        data: undefined,
                        error: new Error(`Please select ${chain.name} from your wallet`),
                    };
                }

                // Reload the page
                window.location.reload(); // IMPORTANT: Somehow wallectconnect signer connected to mainnet by default, fixed by reloading the page
            }
            return result;
        } catch (e) {
            console.error("Cannot connect");
            console.error(e);
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        // Persist data in Metamask
        if (accountData.data?.connector?.name === "MetaMask") {
            setMetamaskState(MetamaskState.NotConnected);
        }
        // Run the disconnect; esp for wallet connect
        disconnect();
    };

    // Create derivatives states based on the global states
    const chain = accountData.data && networkData.data ? (networkData.data.chain as Chain) : DEFAULT_CHAIN;
    const provider = getProvider({ chainId: chain.id });
    const signer = signerData.data ? signerData.data : provider.getSigner();
    const isChainSupported = supportedChains.map((c) => c.id).includes(chain.id);

    // account address is defined only if:
    // 1. If connector is metamask, and the the state is connected
    // 2. If connector is not metamask, but account data is exists
    const isMetamask = accountData.data && accountData.data.connector?.name === "MetaMask" ? true : false;
    const account = (accountData.data && isMetamask && metamaskState === MetamaskState.Connected) || (accountData.data && !isMetamask) ? accountData.data.address : undefined;

    const sharedStates = {
        account: account,
        chain: { unsupported: !isChainSupported, chain: chain },
        connectWallet,
        disconnectWallet,
        switchNetwork,
        signer,
        provider,
    };
    return <WalletContext.Provider value={sharedStates}>{children}</WalletContext.Provider>;
};

type WalletProps = {
    children: ReactNode;
};

export const Wallet: FunctionComponent<WalletProps> = ({ children }) => {
    return (
        <Provider autoConnect={true} connectorStorageKey={connectorStorageKey} connectors={[MetaMaskConnector, WCConnector]} provider={getProvider}>
            <WalletGlobalState>{children}</WalletGlobalState>
        </Provider>
    );
};

export function useWalletContext() {
    return useContext(WalletContext);
}

// Utilities
export const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const getEtherscanAddressURL = (chain: Chain | null, address: string): string => {
    if (chain) {
        if (chain.blockExplorers) {
            return `${chain.blockExplorers[0].url}/address/${address}`;
        }
        return "#";
    }
    return "#";
};
