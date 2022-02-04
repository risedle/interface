import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type TotalAvailableCashRequest = {
    vault: string; // Vault address
    provider: ethers.providers.BaseProvider;
};

export interface TotalAvailableCashFetcherArgs extends TotalAvailableCashRequest {
    namespace: SWRCacheNamespace;
}

// Total available cash fetcher
const TotalAvailableCashFetcher = async (args: TotalAvailableCashFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.VaultGetTotalAvailableCash) throw new Error("TotalAvailableCashFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getTotalAvailableCash();
};

export function useTotalAvailableCash(req: TotalAvailableCashRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>({ vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetTotalAvailableCash }, TotalAvailableCashFetcher);
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
