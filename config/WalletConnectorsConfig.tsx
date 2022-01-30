import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { chain } from "wagmi";

let kovanURL = "";
if (process.env.NEXT_PUBLIC_KOVAN_URL) {
    kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
}

let arbitrumURL = "";
if (process.env.NEXT_PUBLIC_ARBITRUM_URL) {
    arbitrumURL = process.env.NEXT_PUBLIC_ARBITRUM_URL;
}

export const injected_connector = new InjectedConnector({
    chains: [chain.kovan, chain.arbitrumOne],
});

export const getWCConnector = (_chainId: number) => {
    return new WalletConnectConnector({
        chains: [chain.kovan, chain.arbitrumOne],
        options: {
            qrcode: true,
            chainId: _chainId,
            rpc: {
                [chain.kovan.id]: kovanURL,
                [chain.arbitrumOne.id]: arbitrumURL,
            },
        },
    });
};
