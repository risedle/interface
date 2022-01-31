// Fetching onchain data via SWR
// Docs:
// https://swr.vercel.app/docs/arguments
import useSWR from "swr";
import { ethers } from "ethers";
import VaultABI from "../abis/VaultABI";
import { erc20ABI } from "wagmi";

// Vault SWR
export enum VaultFetcherQuery {
    GetNAV,
    GetCollateralPerLeveragedToken,
    GetDebtPerLeveragedToken,
}

export type VaultFetcherKey = {
    token: string;
    vault: string;
    account?: string;
    provider: ethers.providers.BaseProvider;
    query: VaultFetcherQuery;
};

const VaultFetcher = async (
    key: VaultFetcherKey
): Promise<ethers.BigNumber> => {
    const contract = new ethers.Contract(key.vault, VaultABI, key.provider);
    console.debug("VaultFetcher contract", contract);
    console.debug("VaultFetcher key", key);
    switch (key.query) {
        case VaultFetcherQuery.GetNAV:
            return contract.getNAV(key.token);
        case VaultFetcherQuery.GetCollateralPerLeveragedToken:
            return contract.getCollateralPerRiseToken(key.token);
        case VaultFetcherQuery.GetDebtPerLeveragedToken:
            return contract.getDebtPerRiseToken(key.token);
        default:
            throw new Error("Query is not implemented");
    }
};

export function useVault(key: VaultFetcherKey) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(key, VaultFetcher);
    console.debug("useVault data", data);
    console.debug("useVault key", key);
    console.debug("useVault error", error);
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged token ERC20 SWR
export enum LeveragedTokenFetcherQuery {
    GetBalance,
}

export type LeveragedTokenFetcherKey = {
    token: string;
    account?: string;
    provider: ethers.providers.BaseProvider;
    query: LeveragedTokenFetcherQuery;
};

const LeveragedTokenFetcher = async (
    key: LeveragedTokenFetcherKey
): Promise<ethers.BigNumber> => {
    const contract = new ethers.Contract(key.token, erc20ABI, key.provider);
    switch (key.query) {
        case LeveragedTokenFetcherQuery.GetBalance:
            if (!key.account)
                throw new Error("GetBalance: account is not defined");
            return contract.balanceOf(key.account);
        default:
            throw new Error("Query is not implemented");
    }
};

export function useLeveragedToken(key: LeveragedTokenFetcherKey) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        key,
        LeveragedTokenFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
