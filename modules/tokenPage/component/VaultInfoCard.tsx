import { FunctionComponent, useEffect } from "react";
import toast from "react-hot-toast";
import { dollarFormatter } from "../../../utils/formatters";
import { Metadata } from "./MarketMetadata";
import { useMarket } from "../../../components/v1/swr/useMarket";
import ToastError from "../../../uikit/toasts/Error";

/**
 * VaultInfoCardProps is a React Component properties that passed to React Component VaultInfoCard
 */
type VaultInfoCardProps = {
    chainID: number;
    address: string;
};

/**
 * VaultInfoCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const VaultInfoCard: FunctionComponent<VaultInfoCardProps> = ({ chainID, address }) => {
    const metadata = Metadata[chainID][address];

    // Get the market data
    const marketData = useMarket(chainID, address);

    // Toast error if loading is error
    useEffect(() => {
        if (marketData.error) {
            toast.custom((t) => <ToastError>Failed to load Vault information card data, please try to refresh</ToastError>);
        }
    }, [marketData.error]);

    // UI States
    const showLoading = marketData.isLoading || marketData.error ? true : false;
    const showData = !showLoading && marketData.data ? true : false;

    return (
        <div className="flex w-full flex-col space-y-6 rounded-2xl bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Information</h2>
            </div>
            <div className="">
                <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{metadata.vaultInformationText}</p>
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Utilization rate</p>
                    {showLoading && <p className="h-4 w-[100px] animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{marketData.data.vault_utilization_rate.toFixed(2) + "%"}</p>}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total borrowed</p>
                    {showLoading && <p className="h-4 w-[100px] animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(marketData.data.vault_total_outstanding_debt)}</p>}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Available to withdraw</p>
                    {showLoading && <p className="h-4 w-[100px] animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && marketData.data && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(marketData.data.vault_total_available_cash)}</p>}
                </div>
            </div>
        </div>
    );
};

export default VaultInfoCard;
