import { endpoints, Market, fetcher } from "./snapshot";
import useSWR from "swr";

// Get market data using SWR
export function useMarket(chainID: number, address: string) {
    const endpoint = endpoints[chainID];
    const { data, error } = useSWR<Market, Error>(`${endpoint}/v1/markets/${address}`, fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        error: error,
    };
}
