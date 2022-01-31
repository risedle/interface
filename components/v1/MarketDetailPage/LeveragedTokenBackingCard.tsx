import { ethers } from "ethers";
import type { FunctionComponent } from "react";
import { useProvider } from "wagmi";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { useVault, VaultFetcherQuery } from "../../../utils/onchain";
import { Metadata } from "../MarketMetadata";
import { useWalletContext } from "../Wallet";

/**
 * BackingCardProps is a React Component properties that passed to React Component BackingCard
 */
type BackingCardProps = {
    address: string;
};

/**
 * BackingCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const BackingCard: FunctionComponent<BackingCardProps> = ({ address }) => {
    const { chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const collateralPerTokenData = useVault({ token: address, vault: metadata.vaultAddress, provider: provider, query: VaultFetcherQuery.GetCollateralPerLeveragedToken });
    const debtPerTokenData = useVault({ token: address, vault: metadata.vaultAddress, provider: provider, query: VaultFetcherQuery.GetDebtPerLeveragedToken });

    // Data
    const collateral = parseFloat(ethers.utils.formatUnits(collateralPerTokenData.data ? collateralPerTokenData.data : 0, metadata.collateralDecimals));
    const debt = parseFloat(ethers.utils.formatUnits(debtPerTokenData.data ? debtPerTokenData.data : 0, metadata.debtDecimals));

    // UI states
    const showLoading = collateralPerTokenData.isLoading || debtPerTokenData.isLoading ? true : false;
    const showError = collateralPerTokenData.error || debtPerTokenData.error ? true : false;
    const showData = !showLoading && !showError && collateralPerTokenData.data && debtPerTokenData.data ? true : false;

    return (
        <div className="flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2">
            <div className="pt-4">
                <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">Backing per {metadata.title}</h2>
            </div>
            <div className="">
                <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{metadata.title} represents collaterized debt position and can be redeemed at any time.</p>
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row justify-between">
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Asset</p>
                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Allocation</p>
                </div>

                <div className="flex flex-row justify-between">
                    <p className="text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.collateralSymbol}</p>
                    {(showLoading || showError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            {tokenBalanceFormatter.format(collateral)} {metadata.collateralSymbol}
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{metadata.debtSymbol}</p>
                    {(showLoading || showError) && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                    {showData && (
                        <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">
                            -{tokenBalanceFormatter.format(debt)} {metadata.debtSymbol}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BackingCard;
