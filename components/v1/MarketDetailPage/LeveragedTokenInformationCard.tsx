import { FunctionComponent, useEffect } from "react";
import toast from "react-hot-toast";
import { dollarFormatter } from "../../../utils/formatters";
import { Metadata } from "../MarketMetadata";
import { useMarket } from "../swr/useMarket";
import ToastError from "../Toasts/Error";
import { DEFAULT_CHAIN, formatAddress, getEtherscanAddressURL, useWalletContext } from "../Wallet";

/**
 * InformationCardProps is a React Component properties that passed to React Component InformationCard
 */
type InformationCardProps = {
    address: string;
};

/**
 * InformationCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const InformationCard: FunctionComponent<InformationCardProps> = ({ address }) => {
    const { chain } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Get the market data
    const marketData = useMarket(chainID, address);

    // Toast error if loading is error
    useEffect(() => {
        if (marketData.error) {
            toast.custom((t) => <ToastError>Failed to load information card data, please try to refresh</ToastError>);
        }
    }, [marketData.error]);

    // UI States
    const showLoading = marketData.isLoading || marketData.error ? true : false;
    const showData = !showLoading && marketData.data ? true : false;

    return (
        <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Information</h2>
            </div>
            <div className="">
                <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{metadata.informationText}</p>
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Market cap</p>
                    {showLoading && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(marketData.data.leveraged_token_market_cap)}</p>}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Leverage ratio</p>
                    {showLoading && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{marketData.data.leverage_ratio.toFixed(2) + "x"}</p>}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Creation &amp; redemption fees</p>
                    <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">0.1%</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Management fees</p>
                    <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-green-light-11 dark:text-green-dark-11">FREE</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Underlying assets</p>
                    <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                        {metadata.collateralSymbol}, {metadata.debtSymbol}
                    </p>
                </div>
                {/* TODO(bayu): Handle case when capacity is maxed out */}
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Capacity</p>
                    {showLoading && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            <span className="text-green-light-11 dark:text-green-dark-11">{marketData.data.leveraged_token_total_collateral.toFixed(2) + metadata.collateralSymbol}</span> / {marketData.data.leveraged_token_max_total_collateral > 0 && <span>{marketData.data.leveraged_token_max_total_collateral.toFixed(2) + metadata.collateralSymbol}</span>}
                            {marketData.data.leveraged_token_max_total_collateral <= 0 && <span>&#8734;</span>}
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Contract Address</p>
                    <a href={getEtherscanAddressURL(chain.chain, address)} target="_blank" rel="noopener noreferrer" className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                        {formatAddress(address)} &#8599;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InformationCard;
