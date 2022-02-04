import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type LeveragedTokenMetadataRequest = {
    vault: string; // Vault address
    token: string; // Token address
    provider: ethers.providers.BaseProvider;
};

export interface LeveragedTokenMetadataFetcherArgs extends LeveragedTokenMetadataRequest {
    namespace: SWRCacheNamespace;
}

export type LeveragedTokenMetadataResponse = {
    collateral: string;
    feeInEther: ethers.BigNumber;
    initialPrice: ethers.BigNumber;
    isETH: boolean;
    maxLeverageRatioInEther: ethers.BigNumber;
    maxRebalancingValue: ethers.BigNumber;
    maxSwapSlippageInEther: ethers.BigNumber;
    maxTotalCollateral: ethers.BigNumber;
    minLeverageRatioInEther: ethers.BigNumber;
    oracleContract: string;
    rebalancingStepInEther: ethers.BigNumber;
    swapContract: string;
    token: string;
    totalCollateralPlusFee: string;
    totalPendingFees: string;
};

// Leveraged Token Metadata fetcher using SWR
const LeveragedTokenMetadataFetcher = async (args: LeveragedTokenMetadataFetcherArgs): Promise<LeveragedTokenMetadataResponse> => {
    if (args.namespace != SWRCacheNamespace.VaultGetLeveragedTokenMetadata) throw new Error("LeveragedTokenMetadataFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getMetadata(args.token);
};

export function useLeveragedTokenMetadata(req: LeveragedTokenMetadataRequest) {
    const { data, error } = useSWR<LeveragedTokenMetadataResponse, Error>(
        { token: req.token, vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetLeveragedTokenMetadata },
        LeveragedTokenMetadataFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
