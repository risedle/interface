import useSWR from "swr";
import { endpoints, fetcher } from "./snapshot";

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
    const endpoint = endpoints[chainID];
    const { data, error } = useSWR<Array<VaultHistoricalData>, Error>(`${endpoint}/v1/vaults/3months/${vaultAddress}`, fetcher);

    let dailyData: VaultTimeframeData | undefined = undefined;
    let weeklyData: VaultTimeframeData | undefined = undefined;
    let twoWeeklyData: VaultTimeframeData | undefined = undefined;
    let threeWeeklyData: VaultTimeframeData | undefined = undefined;
    let monthlyData: VaultTimeframeData | undefined = undefined;

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

        // Get three monthly data
        const threeWeeklyTimeframeData = data.slice(-504); // 3 weeks = 504 hours
        const threeWeeklyLatestData = threeWeeklyTimeframeData[threeWeeklyTimeframeData.length - 1];
        const threeWeeklyLatestSupplyAPY = threeWeeklyLatestData.supply_apy;
        const threeWeeklyLatestBorrowAPY = threeWeeklyLatestData.borrow_apy;
        threeWeeklyData = {
            latestSupplyAPY: threeWeeklyLatestSupplyAPY,
            latestBorrowAPY: threeWeeklyLatestBorrowAPY,
            data: threeWeeklyTimeframeData,
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
    }

    return {
        daily: dailyData,
        weekly: weeklyData,
        twoWeekly: twoWeeklyData,
        monthly: monthlyData,
        threeWeekly: threeWeeklyData,
        isLoading: !error && !data,
        error: error,
    };
}
