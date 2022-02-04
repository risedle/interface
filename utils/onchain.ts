// Fetching onchain data via SWR
// Docs:
// https://swr.vercel.app/docs/arguments
import useSWR from "swr";
import { ethers } from "ethers";
import VaultABI from "../abis/VaultABI";
import OracleABI from "../abis/OracleABI";
import { erc20ABI } from "wagmi";
import { useWalletContext } from "../components/v1/Wallet";
import { Metadata } from "../components/v1/MarketMetadata";

// Global cache namespace for SWR
// Note: We use global namespace in order to prevent caching key issue on different fetcher on SWR
export enum SWRCacheNamespace {
    GetBalance,
    GetAllowance,
    OracleGetPrice,
    VaultGetLeveragedTokenMetadata,
    VaultGetLeveragedTokenNAV,
    VaultGetCollateralPerLeveragedToken,
    VaultGetDebtPerLeveragedToken,
    VaultGetTotalAvailableCash,
}

export type SWRCacheKey = {
    token?: string;
    vault?: string;
    account?: string;
    oracle?: string;
    provider: ethers.providers.BaseProvider;
    namespace: SWRCacheNamespace; // Global namespace to prevent caching key issue when using different fetcher
};

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
const LeveragedTokenMetadataFetcher = async (cacheKey: SWRCacheKey): Promise<LeveragedTokenMetadataResponse> => {
    if (!cacheKey.vault || !cacheKey.token) throw new Error("LeveragedTokenMetadataFetcher: vault or token is undefined");
    if (cacheKey.namespace != SWRCacheNamespace.VaultGetLeveragedTokenMetadata) throw new Error("LeveragedTokenMetadataFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.vault, VaultABI, cacheKey.provider);
    return contract.getMetadata(cacheKey.token);
};

export function useLeveragedTokenMetadata(token: string, vault: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<LeveragedTokenMetadataResponse, Error>(
        { token, vault, provider, namespace: SWRCacheNamespace.VaultGetLeveragedTokenMetadata },
        LeveragedTokenMetadataFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged Token NAV fetcher using SWR
const LeveragedTokenNAVFetcher = async (key: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (key.namespace != SWRCacheNamespace.VaultGetLeveragedTokenNAV) throw new Error("LeveragedTokenNAVFetcher: namespace invalid");
    if (!key.vault || !key.token) throw new Error("LeveragedTokenNAVFetcher: vault or token is undefined");
    const contract = new ethers.Contract(key.vault, VaultABI, key.provider);
    return contract.getNAV(key.token);
};

export function useLeveragedTokenNAV(address: string) {
    const { chain, provider } = useWalletContext();
    const metadata = Metadata[chain.chain.id][address];
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token: address, vault: metadata.vaultAddress, provider: provider, namespace: SWRCacheNamespace.VaultGetLeveragedTokenNAV },
        LeveragedTokenNAVFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Oracle Fetcher using SWR
const OraclePriceFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.oracle) throw new Error("OraclePriceFetcher: oracle is not defined");
    if (cacheKey.namespace != SWRCacheNamespace.OracleGetPrice) throw new Error("OraclePriceFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.oracle, OracleABI, cacheKey.provider);
    return contract.getPrice();
};

export function useOraclePrice(address: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { oracle: address, provider: provider, namespace: SWRCacheNamespace.OracleGetPrice },
        OraclePriceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Token Balance Fetcher using SWR
const TokenBalanceFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.account) return ethers.BigNumber.from(0);
    if (cacheKey.namespace != SWRCacheNamespace.GetBalance) throw new Error("TokenBalanceFetcher: namespace invalid");
    if (cacheKey.token) {
        const contract = new ethers.Contract(cacheKey.token, erc20ABI, cacheKey.provider);
        return contract.balanceOf(cacheKey.account);
    } else {
        return cacheKey.provider.getBalance(cacheKey.account);
    }
};

export function useTokenBalance(account: string | undefined, provider: ethers.providers.BaseProvider, token?: string) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { account, provider, token, namespace: SWRCacheNamespace.GetBalance },
        TokenBalanceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged token collateral per token fetcher using SWR
const CollateralPerLeveragedTokenFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.vault || !cacheKey.token) throw new Error("CollateralPerLeveragedTokenFetcher: vault or token is undefined");
    if (cacheKey.namespace != SWRCacheNamespace.VaultGetCollateralPerLeveragedToken)
        throw new Error("CollateralPerLeveragedTokenFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.vault, VaultABI, cacheKey.provider);
    return contract.getCollateralPerRiseToken(cacheKey.token);
};

export function useCollateralPerLeveragedToken(token: string, vault: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token, vault, provider, namespace: SWRCacheNamespace.VaultGetCollateralPerLeveragedToken },
        CollateralPerLeveragedTokenFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Leveraged token debt per token fetcher using SWR
const DebtPerLeveragedTokenFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.vault || !cacheKey.token) throw new Error("DebtPerLeveragedTokenFetcher: vault or token is undefined");
    if (cacheKey.namespace != SWRCacheNamespace.VaultGetDebtPerLeveragedToken) throw new Error("DebtPerLeveragedTokenFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.vault, VaultABI, cacheKey.provider);
    return contract.getDebtPerRiseToken(cacheKey.token);
};

export function useDebtPerLeveragedToken(token: string, vault: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { token, vault, provider, namespace: SWRCacheNamespace.VaultGetDebtPerLeveragedToken },
        DebtPerLeveragedTokenFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Total available cash fetcher
const TotalAvailableCashFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.vault) throw new Error("TotalAvailableCashFetcher: vault is undefined");
    if (cacheKey.namespace != SWRCacheNamespace.VaultGetTotalAvailableCash) throw new Error("TotalAvailableCashFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.vault, VaultABI, cacheKey.provider);
    return contract.getTotalAvailableCash();
};

export function useTotalAvailableCash(vault: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { vault, provider, namespace: SWRCacheNamespace.VaultGetTotalAvailableCash },
        TotalAvailableCashFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}

// Token allowance fetcher using SWR
const TokenAllowanceFetcher = async (cacheKey: SWRCacheKey): Promise<ethers.BigNumber> => {
    if (!cacheKey.vault || !cacheKey.token || !cacheKey.account) throw new Error("TotalAvailableCashFetcher: vault, token or account is undefined");
    if (cacheKey.namespace != SWRCacheNamespace.GetAllowance) throw new Error("TokenAllowanceFetcher: namespace invalid");
    const contract = new ethers.Contract(cacheKey.token, erc20ABI, cacheKey.provider);
    return contract.allowance(cacheKey.account, cacheKey.vault);
};

export function useTokenAllowance(account: string | undefined, token: string, vault: string, provider: ethers.providers.BaseProvider) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { account, token, vault, provider, namespace: SWRCacheNamespace.GetAllowance },
        TokenAllowanceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
