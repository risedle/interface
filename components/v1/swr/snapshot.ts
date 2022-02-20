import { chain as Chains } from "wagmi";

export const endpoints = {
    [Chains.kovan.id]: "https://snapshot-kovan.risedle.com",
    [Chains.arbitrumOne.id]: "https://snapshot-arbitrum.risedle.com",
};

// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

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
    vault_utilization_rate: number;
    collateral_per_token: number;
    debt_per_token: number;
    leverage_ratio: number;
};

export type MarketData = {
    aum: number;
    tvl: number;
    markets: Array<Market>;
};

// Chart timeframes
export enum Timeframe {
    Daily,
    Weekly,
    TwoWeekly,
    Monthly,
    ThreeMonthly,
}
