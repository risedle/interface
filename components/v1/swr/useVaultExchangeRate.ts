import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type VaultExchangeRateRequest = {
    vault: string; // Vault address
    provider: ethers.providers.BaseProvider;
};

export interface VaultExchangeRateFetcherArgs extends VaultExchangeRateRequest {
    namespace: SWRCacheNamespace;
}

// Leveraged token collateral per token fetcher using SWR
const VaultExchangeRateFetcher = async (args: VaultExchangeRateFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.VaultGetExchangeRate) throw new Error("VaultExchangeRateFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getExchangeRateInEther();
};

// Get the latest rv/deposit token exchange rate
export function useVaultExchangeRate(req: VaultExchangeRateRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetExchangeRate },
        VaultExchangeRateFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
