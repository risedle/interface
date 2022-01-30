import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import { useProvider } from "wagmi";
import { useLeveragedTokenBalance, useLeveragedTokenNAV } from "../../../utils/onchain";
import { Metadata } from "../MarketMetadata";
import { useWalletContext } from "../Wallet";

/**
 * MyAssetCardProps is a React Component properties that passed to React Component MyAssetCard
 */
type MyAssetCardProps = {
    address: string;
};

/**
 * MyAssetCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MyAssetCard: FunctionComponent<MyAssetCardProps> = ({ address }) => {
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const navData = useLeveragedTokenNAV({ tokenAddress: address, vaultAddress: metadata.vaultAddress, provider: provider });
    const balanceData = useLeveragedTokenBalance({ account: account, address: address, provider: provider });

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navData.data ? navData.data : 0, metadata.debtDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(navData.data ? navData.data : 0, metadata.debtDecimals));

    // UI states
    const showLoading = navData.isLoading || balanceData.isLoading ? true : false;
    const showError = navData.error || balanceData.error ? true : false;
    const showData = !showLoading && !showError && navData.data && balanceData.data ? true : false;

    return (
        <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">My Asset</h2>
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Balance</p>
                    {(showLoading || showError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            {balance.toFixed(3)} {metadata.title}
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total value</p>
                    {(showLoading || showError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            {(balance * nav).toFixed(3)} {metadata.debtSymbol}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAssetCard;
