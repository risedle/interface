import { chain as Chains } from "wagmi";
import useSWR from "swr";

const snapshotEndpoint = {
    [Chains.kovan.id]: "https://snapshot-kovan.risedle.com",
    [Chains.arbitrumOne.id]: "https://snapshot-arbitrum.risedle.com",
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
    const { data, error } = useSWR<MarketData, Error>(`${endpoint}/v1/markets`, fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        error: error,
    };
}

export function useMarket(chainID: number, address: string) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Market, Error>(`${endpoint}/v1/markets/${address}`, fetcher);

    return {
        market: data,
        marketIsLoading: !error && !data,
        marketIsError: error,
    };
}

function filterOutSameNAV(data: Array<LeveragedTokenHistoricalData> | undefined): Array<LeveragedTokenHistoricalData> | undefined {
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

export type LeveragedTokenTimeframeData = {
    latestNAV: number;
    oldestNAV: number;
    change: number;
    data: Array<LeveragedTokenHistoricalData>;
};

export function useLeveragedTokenHistoricalData(chainID: number, leveragedTokenAddress: string) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Array<LeveragedTokenHistoricalData>, Error>(
        `${endpoint}/v1/leveragedTokens/3months/${leveragedTokenAddress}`,
        fetcher
    );

    const cleanedData = filterOutSameNAV(data);
    let dailyData: LeveragedTokenTimeframeData | undefined = undefined;
    let weeklyData: LeveragedTokenTimeframeData | undefined = undefined;
    let twoWeeklyData: LeveragedTokenTimeframeData | undefined = undefined;
    let monthlyData: LeveragedTokenTimeframeData | undefined = undefined;
    let threeMonthlyData: LeveragedTokenTimeframeData | undefined = undefined;

    if (cleanedData) {
        // Get daily data
        const dailyTimeframeData = cleanedData.slice(-24); // 1 day = 24 hours
        const dailyLatestData = dailyTimeframeData[dailyTimeframeData.length - 1];
        const dailyOldestData = dailyTimeframeData[0];
        const dailyLatestNAV = dailyLatestData.nav;
        const dailyOldestNAV = dailyOldestData.nav;
        const dailyChange = ((dailyLatestNAV - dailyOldestNAV) / dailyOldestNAV) * 100;
        dailyData = {
            latestNAV: dailyLatestNAV,
            oldestNAV: dailyOldestNAV,
            change: dailyChange,
            data: dailyTimeframeData,
        };

        // Get weekly data
        const weeklyTimeframeData = cleanedData.slice(-168); // 1 week = 168 hours
        const weeklyLatestData = weeklyTimeframeData[weeklyTimeframeData.length - 1];
        const weeklyOldestData = weeklyTimeframeData[0];
        const weeklyLatestNAV = weeklyLatestData.nav;
        const weeklyOldestNAV = weeklyOldestData.nav;
        const weeklyChange = ((weeklyLatestNAV - weeklyOldestNAV) / weeklyOldestNAV) * 100;
        weeklyData = {
            latestNAV: weeklyLatestNAV,
            oldestNAV: weeklyOldestNAV,
            change: weeklyChange,
            data: weeklyTimeframeData,
        };

        // Get two weekly data
        const twoWeeklyTimeframeData = cleanedData.slice(-336); // 2 weeks = 336 hours
        const twoWeeklyLatestData = twoWeeklyTimeframeData[twoWeeklyTimeframeData.length - 1];
        const twoWeeklyOldestData = twoWeeklyTimeframeData[0];
        const twoWeeklyLatestNAV = twoWeeklyLatestData.nav;
        const twoWeeklyOldestNAV = twoWeeklyOldestData.nav;
        const twoWeeklyChange = ((twoWeeklyLatestNAV - twoWeeklyOldestNAV) / twoWeeklyOldestNAV) * 100;
        twoWeeklyData = {
            latestNAV: twoWeeklyLatestNAV,
            oldestNAV: twoWeeklyOldestNAV,
            change: twoWeeklyChange,
            data: twoWeeklyTimeframeData,
        };

        // Get monthly data
        const monthlyTimeframeData = cleanedData.slice(-672); // 1 month = 672 hours
        const monthlyLatestData = monthlyTimeframeData[monthlyTimeframeData.length - 1];
        const monthlyOldestData = monthlyTimeframeData[0];
        const monthlyLatestNAV = monthlyLatestData.nav;
        const monthlyOldestNAV = monthlyOldestData.nav;
        const monthlyChange = ((monthlyLatestNAV - monthlyOldestNAV) / monthlyOldestNAV) * 100;
        monthlyData = {
            latestNAV: monthlyLatestNAV,
            oldestNAV: monthlyOldestNAV,
            change: monthlyChange,
            data: monthlyTimeframeData,
        };

        // Get three monthly data
        const threeMonthlyTimeframeData = cleanedData.slice(-2016); // 3 months = 2016 hours
        const threeMonthlyLatestData = threeMonthlyTimeframeData[threeMonthlyTimeframeData.length - 1];
        const threeMonthlyOldestData = threeMonthlyTimeframeData[0];
        const threeMonthlyLatestNAV = threeMonthlyLatestData.nav;
        const threeMonthlyOldestNAV = threeMonthlyOldestData.nav;
        const threeMonthlyChange = ((threeMonthlyLatestNAV - threeMonthlyOldestNAV) / threeMonthlyOldestNAV) * 100;
        threeMonthlyData = {
            latestNAV: threeMonthlyLatestNAV,
            oldestNAV: threeMonthlyOldestNAV,
            change: threeMonthlyChange,
            data: threeMonthlyTimeframeData,
        };
    }

    return {
        daily: dailyData,
        weekly: weeklyData,
        twoWeekly: twoWeeklyData,
        monthly: monthlyData,
        threeMonthly: threeMonthlyData,
        isLoading: !error && !data,
        error: error,
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

export type VaultTimeframeData = {
    latestBorrowAPY: number;
    latestSupplyAPY: number;
    data: Array<VaultHistoricalData>;
};

export function useVaultHistoricalData(chainID: number, vaultAddress: string) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR<Array<VaultHistoricalData>, Error>(`${endpoint}/v1/vaults/3months/${vaultAddress}`, fetcher);

    let dailyData: VaultTimeframeData | undefined = undefined;
    let weeklyData: VaultTimeframeData | undefined = undefined;
    let twoWeeklyData: VaultTimeframeData | undefined = undefined;
    let monthlyData: VaultTimeframeData | undefined = undefined;
    let threeMonthlyData: VaultTimeframeData | undefined = undefined;

    if (data) {
        // Get daily data
        const dailyTimeframeData = data.slice(-24); // 1 day = 24 hours
        const dailyLatestData = dailyTimeframeData[dailyTimeframeData.length - 1];
        const dailyLatestSupplyAPY = dailyLatestData.supply_apy;
        const dailyLatestBorrowAPY = dailyLatestData.borrow_apy;
        dailyData = {
            latestSupplyAPY: dailyLatestSupplyAPY,
            latestBorrowAPY: dailyLatestBorrowAPY,
            data: dailyTimeframeData,
        };

        // Get weekly data
        const weeklyTimeframeData = data.slice(-168); // 1 week = 168 hours
        const weeklyLatestData = weeklyTimeframeData[weeklyTimeframeData.length - 1];
        const weeklyLatestSupplyAPY = weeklyLatestData.supply_apy;
        const weeklyLatestBorrowAPY = weeklyLatestData.borrow_apy;
        weeklyData = {
            latestSupplyAPY: weeklyLatestSupplyAPY,
            latestBorrowAPY: weeklyLatestBorrowAPY,
            data: weeklyTimeframeData,
        };

        // Get two weekly data
        const twoWeeklyTimeframeData = data.slice(-336); // 2 weeks = 336 hours
        const twoWeeklyLatestData = twoWeeklyTimeframeData[twoWeeklyTimeframeData.length - 1];
        const twoWeeklyLatestSupplyAPY = twoWeeklyLatestData.supply_apy;
        const twoWeeklyLatestBorrowAPY = twoWeeklyLatestData.borrow_apy;
        twoWeeklyData = {
            latestSupplyAPY: twoWeeklyLatestSupplyAPY,
            latestBorrowAPY: twoWeeklyLatestBorrowAPY,
            data: twoWeeklyTimeframeData,
        };

        // Get monthly data
        const monthlyTimeframeData = data.slice(-672); // 1 month = 672 hours
        const monthlyLatestData = monthlyTimeframeData[monthlyTimeframeData.length - 1];
        const monthlyLatestSupplyAPY = monthlyLatestData.supply_apy;
        const monthlyLatestBorrowAPY = monthlyLatestData.borrow_apy;
        monthlyData = {
            latestSupplyAPY: monthlyLatestSupplyAPY,
            latestBorrowAPY: monthlyLatestBorrowAPY,
            data: monthlyTimeframeData,
        };

        // Get three monthly data
        const threeMonthlyTimeframeData = data.slice(-2016); // 3 months = 2016 hours
        const threeMonthlyLatestData = threeMonthlyTimeframeData[threeMonthlyTimeframeData.length - 1];
        const threeMonthlyLatestSupplyAPY = threeMonthlyLatestData.supply_apy;
        const threeMonthlyLatestBorrowAPY = threeMonthlyLatestData.borrow_apy;
        threeMonthlyData = {
            latestSupplyAPY: threeMonthlyLatestSupplyAPY,
            latestBorrowAPY: threeMonthlyLatestBorrowAPY,
            data: threeMonthlyTimeframeData,
        };
    }

    return {
        daily: dailyData,
        weekly: weeklyData,
        twoWeekly: twoWeeklyData,
        monthly: monthlyData,
        threeMonthly: threeMonthlyData,
        isLoading: !error && !data,
        error: error,
    };
}
