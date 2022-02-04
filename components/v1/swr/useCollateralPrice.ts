import { ethers } from "ethers";
import useSWR from "swr";
import { OracleABI } from "../../../abis/OracleABI";
import { SWRCacheNamespace } from "./namespace";

export type OraclePriceRequest = {
    oracle: string; // Oracle address
    provider: ethers.providers.BaseProvider;
};

export interface OraclePriceFetcherArgs extends OraclePriceRequest {
    namespace: SWRCacheNamespace;
}

// Oracle Fetcher using SWR
const OraclePriceFetcher = async (args: OraclePriceFetcherArgs): Promise<ethers.BigNumber> => {
    if (args.namespace != SWRCacheNamespace.OracleGetPrice) throw new Error("OraclePriceFetcher: namespace invalid");
    const contract = new ethers.Contract(args.oracle, OracleABI, args.provider);
    return contract.getPrice();
};

export function useOraclePrice(req: OraclePriceRequest) {
    const { data, error } = useSWR<ethers.BigNumber, Error>(
        { oracle: req.oracle, provider: req.provider, namespace: SWRCacheNamespace.OracleGetPrice },
        OraclePriceFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    };
}
