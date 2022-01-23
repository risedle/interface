import { chain as Chains } from "wagmi";
import useSWR from "swr";

const snapshotEndpoint = {
    [Chains.kovan.id]: "https://snapshot-kovan.risedle.com",
};

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export type Market = {
    leveraged_token_address: string;
    leveraged_token_collateral_price: number;
    leveraged_token_market_cap: number;
    leveraged_token_total_supply: number;
    leveraged_token_max_total_collateral: number;
    leveraged_token_price_change: number;
    leveraged_token_price_change_percent: number;
    leveraged_token_total_collateral: number;
    nav_last: number;
    nav_past: number;
    timestamp_last: string;
    timestamp_past: string;
    vault_address: string;
    vault_borrow_apy: number;
    vault_max_total_deposit: number;
    vault_supply_apy: number;
    vault_timestamp: string;
    vault_total_available_cash: number;
    vault_total_outstanding_debt: number;
    vault_utilization_rate?: number;
    collateral_per_token?: number;
    debt_per_token?: number;
    leverage_ratio?: number;
};

export type MarketData = {
    aum: number;
    tvl: number;
    markets: Array<Market>;
};

export function useMarkets(chainID: number) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<MarketData, Error>(
        `${endpoint}/v1/markets`,
        fetcher
    );

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useMarket(chainID: number, address: string) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Market, Error>(
        `${endpoint}/v1/markets/${address}`,
        fetcher
    );

    return {
        market: data,
        marketIsLoading: !error && !data,
        marketIsError: error,
    };
}

function filterOutSameNAV(
    data: Array<LeveragedTokenHistoricalData> | undefined
): Array<LeveragedTokenHistoricalData> | undefined {
    if (!data) return undefined;
    return [...new Map(data.map((item) => [item["nav"], item])).values()];
}

export type LeveragedTokenHistoricalData = {
    timestamp: string;
    collateral_per_leveraged_token: number;
    debt_per_leveraged_token: number;
    leverage_ratio: number;
    nav: number;
};

// Chart timeframes
export enum Timeframe {
    Daily,
    Weekly,
    TwoWeekly,
    Monthly,
    ThreeMonthly,
}

export function useLeveragedTokenData3Months(
    chainID: number,
    leveragedTokenAddress: string
) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Array<LeveragedTokenHistoricalData>, Error>(
        `${endpoint}/v1/leveragedTokens/3months/${leveragedTokenAddress}`,
        fetcher
    );

    return {
        leveragedTokenHistoricalData: filterOutSameNAV(data),
        leveragedTokenHistoricalDataIsLoading: !error && !data,
        leveragedTokenHistoricalDataIsError: error,
    };
}

export type VaultHistoricalData = {
    timestamp: string;
    borrow_apy: number;
    supply_apy: number;
    utilization_rate: number;
    total_available_cash: number;
    total_outstanding_debt: number;
};

export function useVaultData3Months(chainID: number, vaultAddress: string) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Array<VaultHistoricalData>, Error>(
        `${endpoint}/v1/vaults/3months/${vaultAddress}`,
        fetcher
    );

    return {
        vaultHistoricalData: data,
        vaultHistoricalDataIsLoading: !error && !data,
        vaultHistoricalDataIsError: error,
    };
}
