import { chain as Chains } from "wagmi";
import useSWR from "swr";

const snapshotEndpoint = {
    [Chains.kovan.id]: "https://snapshot-kovan.risedle.com",
};

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export function useMarkets(chainID: number) {
    const endpoint = snapshotEndpoint[chainID];
    const { data, error } = useSWR(`${endpoint}/v1/markets`, fetcher);

    return {
        markets: data,
        isLoading: !error && !data,
        isError: error,
    };
}
