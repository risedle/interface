import useSWR from "swr";
import { endpoints, fetcher, MarketData } from "./snapshot";

// Get list of markets using SWR
export function useMarkets(chainID: number) {
    const endpoint = endpoints[chainID];
    const { data, error } = useSWR<MarketData, Error>(`${endpoint}/v1/markets`, fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        error: error,
    };
}
