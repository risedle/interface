import { ethers } from "ethers";
import useSWR from "swr";
import { erc20ABI } from "wagmi";
import { SWRCacheNamespace } from "./namespace";

export type TokenBalanceRequest = {
    account: string | undefined; // Account address
    token?: string; // Token address; If undefined the native token balance will be fetched
    provider: ethers.providers.BaseProvider;
};

export interface TokenBalanceFetcherArgs extends TokenBalanceRequest {
    account: string;
    namespace: SWRCacheNamespace;
}

const TokenBalanceFetcher = async (args: TokenBalanceFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.GetBalance) throw new Error("TokenBalanceFetcher: namespace invalid");
    if (args.token) {
        const contract = new ethers.Contract(args.token, erc20ABI, args.provider);
        return contract.balanceOf(args.account);
    } else {
        return args.provider.getBalance(args.account);
    }
};

// Fetch current balance of given acccount for specified token
export function useTokenBalance(req: TokenBalanceRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { account: req.account, token: req.token, provider: req.provider, namespace: SWRCacheNamespace.GetBalance },
        TokenBalanceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
