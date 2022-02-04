import { ethers } from "ethers";
import useSWR from "swr";
import { VaultABI } from "../../../abis/VaultABI";
import { SWRCacheNamespace } from "./namespace";

export type DebtPerLeveragedTokenRequest = {
    vault: string; // Vault address
    token: string; // Token address
    provider: ethers.providers.BaseProvider;
};

export interface DebtPerLeveragedTokenFetcherArgs extends DebtPerLeveragedTokenRequest {
    namespace: SWRCacheNamespace;
}

// Leveraged token debt per token fetcher using SWR
const DebtPerLeveragedTokenFetcher = async (args: DebtPerLeveragedTokenFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.VaultGetDebtPerLeveragedToken) throw new Error("DebtPerLeveragedTokenFetcher: namespace invalid");
    const contract = new ethers.Contract(args.vault, VaultABI, args.provider);
    return contract.getDebtPerRiseToken(args.token);
};

export function useDebtPerLeveragedToken(req: DebtPerLeveragedTokenRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token: req.token, vault: req.vault, provider: req.provider, namespace: SWRCacheNamespace.VaultGetDebtPerLeveragedToken },
        DebtPerLeveragedTokenFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
