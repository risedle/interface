import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type CollateralPerLeveragedTokenRequest = {
    vault: string; // Vault address
    token: string; // Token address
    provider: ethers.providers.BaseProvider;
};

export interface CollateralPerLeveragedTokenFetcherArgs extends CollateralPerLeveragedTokenRequest {
    namespace: SWRCacheNamespace;
}

// Leveraged token collateral per token fetcher using SWR
const CollateralPerLeveragedTokenFetcher = async (args: CollateralPerLeveragedTokenFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.VaultGetCollateralPerLeveragedToken)
        throw new Error("CollateralPerLeveragedTokenFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getCollateralPerRiseToken(args.token);
};

// Get the latest collateral per leveraged token
export function useCollateralPerLeveragedToken(req: CollateralPerLeveragedTokenRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token: req.token, vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetCollateralPerLeveragedToken },
        CollateralPerLeveragedTokenFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
