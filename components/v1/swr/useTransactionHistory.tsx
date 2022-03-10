import { ethers, Event } from "ethers";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { useTransferEvents } from "./useTransferEvents";
import useSWR from "swr";
import { erc20ABI } from "wagmi";
import { SWRCacheNamespace } from "./namespace";

export type TransactionHistoryRequest = {
    account: string | undefined; // Account address
    contract: string; // ERC20 token contract address
    provider: ethers.providers.BaseProvider;
};

export interface TransactionHistoryResult {
    date: Date,
    value: string,
    type: string
};

export interface TransactionHistoryFetcherArgs extends TransactionHistoryRequest {
    account: string;
    namespace: SWRCacheNamespace;
}

const TransactionHistoryFetcher = (args: TransactionHistoryFetcherArgs): Array<TransactionHistoryResult> => {
    if(args.namespace != SWRCacheNamespace.TransactionHistory ) throw new Error("TransferEventsFetcher: namespace invalid");

    const TokenContract = new ethers.Contract(args.contract, erc20ABI , args.provider);
    // List of token transfer events from user's address to any other address (balance decreased)
    const transferOutFilter = TokenContract.filters.Transfer(args.account);
    // List of token transfer events to user's address from any other address (balance added)
    const transferInFilter = TokenContract.filters.Transfer(null, args.account);

    const transferOut = TokenContract.queryFilter(transferOutFilter);
    const transferIn = TokenContract.queryFilter(transferInFilter);

    let transactionHistory: Array<TransactionHistoryResult> = [];

    transferOut.then((item) => {
        item.forEach(async(event) => {
            const transactionDate = new Date((await event.getBlock()).timestamp * 1000);
            const transactionValue = parseFloat(ethers.utils.formatUnits(event.args?.value)).toFixed(2);
            let data: TransactionHistoryResult = {
                date: transactionDate,
                value: transactionValue,
                type: "Redeem"
            }
            transactionHistory.push(data);
        })
    })

    transferIn.then((item) => {
        item.forEach(async(event) => {
            const transactionDate = new Date((await event.getBlock()).timestamp * 1000);
            const transactionValue = parseFloat(ethers.utils.formatUnits(event.args?.value)).toFixed(2);
            let data: TransactionHistoryResult = {
                date: transactionDate,
                value: transactionValue,
                type: "Mint"
            }
            transactionHistory.push(data);
        })
    })

    return transactionHistory;
}

export function useTransactionHistory(req: TransactionHistoryRequest){
    const { data, error } = useSWR<Array<TransactionHistoryResult>, Error>(
        { account: req.account, contract: req.contract, provider: req.provider, namespace: SWRCacheNamespace.TransactionHistory},
        TransactionHistoryFetcher
    );
    return {
        data: data,
        isLoading: !data && !error,
        error: error,
    }
}