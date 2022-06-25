import { Chain, chain } from "wagmi";
import { customChains } from "../components/v1/Wallet";

const networkInfo: Record<number, Chain> = {
    [customChains.bsc.id]: customChains.bsc,
    [chain.arbitrumOne.id]: chain.arbitrumOne,
};

export const manualSwitchNetwork = async (chain: number) => {
    const metamask = window.ethereum;
    try {
        await metamask?.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${networkInfo[chain].id.toString(16)}`,
                    chainName: networkInfo[chain].name,
                    nativeCurrency: networkInfo[chain].nativeCurrency,
                    rpcUrls: networkInfo[chain].rpcUrls,
                    blockExplorerUrls: networkInfo[chain].blockExplorers?.map((item) => item.url),
                },
            ],
        });
    } catch (error) {
        console.log(error);
        await metamask?.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: `0x${networkInfo[chain].id.toString(16)}`,
                },
            ],
        });
    }
};
