// Fetching onchain data via SWR
// Docs:
// https://swr.vercel.app/docs/arguments
import useSWR from "swr";
import { ethers } from "ethers";
import VaultABI from "../abis/VaultABI";

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
