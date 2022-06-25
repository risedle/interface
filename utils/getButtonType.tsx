import { chain as Chains, Chain } from "wagmi";
import { customChains } from "../components/v1/Wallet";

export const getButtonType = (c: Chain): "bsc" | "arb" => {
    switch (c.id) {
        case Chains.arbitrumOne.id:
            return "arb";
        case customChains.bsc.id:
            return "bsc";
    }
    return "arb";
};
