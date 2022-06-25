import { chain as Chains, Chain } from "wagmi";
import { customChains } from "../components/v1/Wallet";

export const getChainIconPath = (c: Chain): string => {
    switch (c.id) {
        case Chains.arbitrumOne.id:
            return "/networks/Arbitrum.svg";
        case customChains.bsc.id:
            return "/networks/Bsc.svg";
    }
    return "/networks/Arbitrum.svg";
};
