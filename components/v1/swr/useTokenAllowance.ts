import { ethers } from "ethers";
import useSWR from "swr";
import { erc20ABI } from "wagmi";
import { SWRCacheNamespace } from "./namespace";

export type TokenAllowanceRequest = {
    account: string | undefined; // Account address
    token: string; // Token address
    spender: string; // Spender address
    provider: ethers.providers.BaseProvider;
};

export interface TokenAllowanceFetcherArgs extends TokenAllowanceRequest {
    account: string;
    namespace: SWRCacheNamespace;
}

const TokenAllowanceFetcher = async (args: TokenAllowanceFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.GetAllowance) throw new Error("TokenAllowanceFetcher: namespace invalid");
    const contract = new ethers.Contract(args.token, erc20ABI, args.provider);
    return contract.allowance(args.account, args.spender);
};

// Get token allowance for given account and the spender
export function useTokenAllowance(req: TokenAllowanceRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { account: req.account, token: req.token, spender: req.spender, provider: req.provider, namespace: SWRCacheNamespace.GetAllowance },
        TokenAllowanceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
