import { Chain } from "wagmi";

export const getExplorerLink = (chain: Chain, hash: string) => {
    return chain.blockExplorers && chain.blockExplorers.length ? `${chain.blockExplorers[0].url}/tx/${hash}` : "#";
};
