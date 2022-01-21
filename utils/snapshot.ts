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
