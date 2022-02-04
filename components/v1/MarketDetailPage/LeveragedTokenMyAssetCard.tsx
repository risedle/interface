import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenNAV } from "../swr/useLeveragedTokenNAV";
import { useTokenBalance } from "../swr/useTokenBalance";
import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";

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
    const { account, chain, provider } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Read on-chain data
    const navResponse = useLeveragedTokenNAV({ token: address, vault: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: address, provider: provider });

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navResponse.data ? navResponse.data : 0, metadata.debtDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, metadata.collateralDecimals));

    // UI states
    const showLoading = navResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = navResponse.error || balanceResponse.error ? true : false;
    const showData = !showLoading && !showError && navResponse.data && balanceResponse.data ? true : false;

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
                            {tokenBalanceFormatter.format(balance)} {metadata.title}
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Total value</p>
                    {(showLoading || showError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            {tokenBalanceFormatter.format(balance * nav)} {metadata.debtSymbol}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAssetCard;
