import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type LeveragedTokenNAVRequest = {
    vault: string; // Vault address
    token: string; // Token address
    provider: ethers.providers.BaseProvider;
};

export interface LeveragedTokenNAVFetcherArgs extends LeveragedTokenNAVRequest {
    namespace: SWRCacheNamespace;
}

// Leveraged Token NAV fetcher using SWR
const LeveragedTokenNAVFetcher = async (args: LeveragedTokenNAVFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.VaultGetLeveragedTokenNAV) throw new Error("LeveragedTokenNAVFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getNAV(args.token);
};

// Get the latest NAV of the leveraged token
export function useLeveragedTokenNAV(req: LeveragedTokenNAVRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token: req.token, vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetLeveragedTokenNAV },
        LeveragedTokenNAVFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
