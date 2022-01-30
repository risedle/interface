// Fetching onchain data via SWR
// Docs:
// https://swr.vercel.app/docs/arguments
import useSWR from "swr";
import { ethers } from "ethers";
import VaultABI from "../abis/VaultABI";
import { erc20ABI } from "wagmi";

// Leveraged Token NAV
export type LeveragedTokenNAVFetcherKey = {
    vaultAddress: string;
    tokenAddress: string;
    provider: ethers.providers.BaseProvider;
};

const leveragedTokenNAVFetcher = async (
    key: LeveragedTokenNAVFetcherKey
): Promise<ethers.BigNumber> => {
    const vaultContract = new ethers.Contract(
        key.vaultAddress,
        VaultABI,
        key.provider
    );
    return vaultContract.getNAV(key.tokenAddress);
};

export function useLeveragedTokenNAV(key: LeveragedTokenNAVFetcherKey) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        key,
        leveragedTokenNAVFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged Token Balance
export type LeveragedTokenBalanceFetcherKey = {
    address: string;
    account: string;
    provider: ethers.providers.BaseProvider;
};

const leveragedTokenBalanceFetcher = async (
    key: LeveragedTokenBalanceFetcherKey
): Promise<ethers.BigNumber> => {
    const tokenContract = new ethers.Contract(
        key.address,
        erc20ABI,
        key.provider
    );
    return tokenContract.balanceOf(key.account);
};

export function useLeveragedTokenBalance(key: LeveragedTokenBalanceFetcherKey) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        key,
        leveragedTokenBalanceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
