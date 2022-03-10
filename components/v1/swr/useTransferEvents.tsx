import { ethers, Event } from "ethers";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import useSWR from "swr";
import { erc20ABI } from "wagmi";
import { SWRCacheNamespace } from "./namespace";

export type TransferEventsRequest = {
    account: string | undefined; // Account address
    contract: string; // ERC20 token contract address
    provider: ethers.providers.BaseProvider;
};

export interface TransferEventsFetcherArgs extends TransferEventsRequest {
    account: string;
    namespace: SWRCacheNamespace;
}

const TransferEventsFetcher = (args: TransferEventsFetcherArgs): Promise<Array<Array<Event>>> => {
    if(args.namespace != SWRCacheNamespace.TransferEvents ) throw new Error("TransferEventsFetcher: namespace invalid");

    const TokenContract = new ethers.Contract(args.contract, erc20ABI , args.provider);
    // List of token transfer events from user's address to any other address (balance decreased)
    const transferOutFilter = TokenContract.filters.Transfer(args.account);
    // List of token transfer events to user's address from any other address (balance added)
    const transferInFilter = TokenContract.filters.Transfer(null, args.account);

    const transferOut = TokenContract.queryFilter(transferOutFilter);
    const transferIn = TokenContract.queryFilter(transferInFilter);

    return Promise.all([transferOut, transferIn]);
}

export function useTransferEvents(req: TransferEventsRequest){
    const { data, error } = useSWR<Array<Array<Event>>, Error>(
        { account: req.account, contract: req.contract, provider: req.provider, namespace: SWRCacheNamespace.TransferEvents},
        TransferEventsFetcher
    );
    return {
        data: data && data[0].concat(data[1]).sort((a, b) => { return a.blockNumber - b.blockNumber }),
        isLoading: !data && !error,
        error: error,
    }
}