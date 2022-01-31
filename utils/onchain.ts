// Fetching onchain data via SWR
// Docs:
// https://swr.vercel.app/docs/arguments
import useSWR from "swr";
import { ethers } from "ethers";
import VaultABI from "../abis/VaultABI";
import { erc20ABI } from "wagmi";

// Vault SWR
export enum FetcherQuery {
    GetNAV,
    GetCollateralPerLeveragedToken,
    GetDebtPerLeveragedToken,
    GetBalance,
}

export type FetcherKey = {
    token?: string;
    vault?: string;
    account?: string;
    provider: ethers.providers.BaseProvider;
    query: FetcherQuery;
};

const VaultFetcher = async (key: FetcherKey): Promise<ethers.BigNumber> => {
    if (!key.vault) throw new Error("VaultFetcher: vault is undefined");
    const contract = new ethers.Contract(key.vault, VaultABI, key.provider);
    switch (key.query) {
        case FetcherQuery.GetNAV:
            return contract.getNAV(key.token);
        case FetcherQuery.GetCollateralPerLeveragedToken:
            return contract.getCollateralPerRiseToken(key.token);
        case FetcherQuery.GetDebtPerLeveragedToken:
            return contract.getDebtPerRiseToken(key.token);
        default:
            throw new Error("Query is not implemented");
    }
};

export function useVault(key: FetcherKey) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(key, VaultFetcher);
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged token ERC20 SWR
const LeveragedTokenFetcher = async (
    key: FetcherKey
): Promise<ethers.BigNumber> => {
    if (!key.token)
        throw new Error("LeveragedTokenFetcher: token is not defined");
    const contract = new ethers.Contract(key.token, erc20ABI, key.provider);
    switch (key.query) {
        case FetcherQuery.GetBalance:
            if (!key.account)
                throw new Error("GetBalance: account is not defined");
            return contract.balanceOf(key.account);
        default:
            throw new Error("Query is not implemented");
    }
};

export function useLeveragedToken(key: FetcherKey) {
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
