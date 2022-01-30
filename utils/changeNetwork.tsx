import { chain } from "wagmi";

// Get the Arbitrum URL from .env file
let arbitrumURL = "";
if (process.env.NEXT_PUBLIC_ARBITRUM_URL) {
    arbitrumURL = process.env.NEXT_PUBLIC_ARBITRUM_URL;
}

// Get the Kovan URL from .env file
let kovanURL = "";
if (process.env.NEXT_PUBLIC_KOVAN_URL) {
    kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
}

export const changeToArbitrum = async () => {
    const metamask = window.ethereum;
    try {
        await metamask?.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${chain.arbitrumOne.id.toString(16)}`,
                    chainName: "Arbitrum Mainnet",
                    nativeCurrency: {
                        name: "AETH",
                        symbol: "aeth",
                        decimals: 18,
                    },
                    rpcUrls: [arbitrumURL],
                    blockExplorerUrls: ["https://arbiscan.io/"],
                },
            ],
        });
    } catch (error) {
        console.log(error);
        await metamask?.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: `0x${chain.arbitrumOne.id.toString(16)}`,
                },
            ],
        });
    }
};

export const changeToKovan = async () => {
    const metamask = window.ethereum;
    try {
        await metamask?.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${chain.kovan.id.toString(16)}`,
                    chainName: "Kovan Test Network",
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "eth",
                        decimals: 18,
                    },
                    rpcUrls: [kovanURL],
                    blockExplorerUrls: ["https://kovan.etherscan.io/"],
                },
            ],
        });
    } catch (error) {
        console.log(error);
        await metamask?.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: `0x${chain.kovan.id.toString(16)}`,
                },
            ],
        });
    }
};
