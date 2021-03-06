import { FunctionComponent } from "react";

import { getProvider, useWalletContext } from "../../../../../components/v1/Wallet";
import { Metadata } from "../../../../tokenPage/component/MarketMetadata";
import { ethers } from "ethers";
import { useLeveragedTokenMetadata } from "../../../../../components/v1/swr/useLeveragedTokenMetadata";
import FormLoading from "../Placeholder/FormLoading";
import FormLoadingFailed from "../Placeholder/FormLoadingFailed";
import BuyForm from "./BuyForm";
import { useTokenAllowance } from "../../../../../components/v1/swr/useTokenAllowance";

/**
 * BuyDialogContentProps is a React Component properties that passed to React Component BuyDialogContent
 */
type BuyDialogContentProps = {
    chainID: number;
    address: string;
};

/**
 * BuyDialogContent is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const BuyDialogContent: FunctionComponent<BuyDialogContentProps> = ({ chainID, address }) => {
    // Global states
    const { account, chain, signer } = useWalletContext();
    const provider = getProvider({ chainId: chainID });
    const metadata = Metadata[chainID][address];
    const allowanceResponse = useTokenAllowance({ account: account, token: address, spender: metadata.vaultAddress, provider: provider });

    // Read onchain data
    // TODO(bayu): If metada.isETH is false, then check allowance and show approval is needed
    const leveragedTokenMetadataResponse = useLeveragedTokenMetadata({ token: address, vault: metadata.vaultAddress, provider: provider });

    // Parse onchain data
    const maxTotalCollateral = parseFloat(ethers.utils.formatUnits(leveragedTokenMetadataResponse.data ? leveragedTokenMetadataResponse.data.maxTotalCollateral : 0, metadata.collateralDecimals));
    const totalCollateralPlusFee = parseFloat(ethers.utils.formatUnits(leveragedTokenMetadataResponse.data ? leveragedTokenMetadataResponse.data.totalCollateralPlusFee : 0, metadata.collateralDecimals));
    const totalPendingFees = parseFloat(ethers.utils.formatUnits(leveragedTokenMetadataResponse.data ? leveragedTokenMetadataResponse.data.totalPendingFees : 0, metadata.collateralDecimals));

    // UI states
    const showLoading = leveragedTokenMetadataResponse.isLoading ? true : false;
    const showError = !showLoading && leveragedTokenMetadataResponse.error ? true : false;
    // TODO: show ApprovalOrMaxCapOrMintForm
    const showMintFormOrMaxCap = !showLoading && !showError && leveragedTokenMetadataResponse.data ? true : false;

    // Second order UI states
    const showMaxCap = maxTotalCollateral > 0 && totalCollateralPlusFee - totalPendingFees > maxTotalCollateral ? true : false;
    const showMintForm = !showMaxCap;

    return (
        <div>
            {/* Show loading states */}
            {showLoading && <FormLoading />}

            {/* Show error states */}
            {showError && <FormLoadingFailed />}

            {showMintFormOrMaxCap && (
                <div>
                    {/* Show max cap is reached */}
                    {showMaxCap && (
                        <div className="mt-4 flex flex-col space-y-4">
                            <div className="flex flex-row items-center space-x-2 rounded-lg border border-yellow-light-5 bg-yellow-light-2 p-4 dark:border-yellow-dark-5 dark:bg-yellow-dark-2">
                                <svg className="fill-yellow-light-12 dark:fill-yellow-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.4449 1.10861C8.0183 0.392832 6.9817 0.392832 6.55509 1.10861L0.161178 11.8367C-0.275824 12.5699 0.252503 13.4998 1.10608 13.4998H13.8939C14.7475 13.4998 15.2758 12.5699 14.8388 11.8367L8.4449 1.10861ZM7.4141 1.62058C7.45288 1.55551 7.54712 1.55551 7.5859 1.62058L13.9798 12.3486C14.0196 12.4153 13.9715 12.4998 13.8939 12.4998H1.10608C1.02849 12.4998 0.980454 12.4153 1.02018 12.3486L7.4141 1.62058ZM6.8269 4.98596C6.81221 4.60408 7.11783 4.28648 7.5 4.28648C7.88217 4.28648 8.18778 4.60408 8.1731 4.98596L8.01921 8.98686C8.00848 9.26585 7.7792 9.48649 7.5 9.48649C7.2208 9.48649 6.99151 9.26585 6.98078 8.98686L6.8269 4.98596ZM8.24989 10.9758C8.24989 11.3901 7.9141 11.7258 7.49989 11.7258C7.08567 11.7258 6.74989 11.3901 6.74989 10.9758C6.74989 10.5616 7.08567 10.2258 7.49989 10.2258C7.9141 10.2258 8.24989 10.5616 8.24989 10.9758Z"
                                    />
                                </svg>
                                <p className="text-xs text-yellow-light-12 dark:text-yellow-dark-12">ETHRISE Buy capacity already maxed.</p>
                            </div>
                        </div>
                    )}

                    {/* Show mint input */}
                    {showMintForm && <BuyForm chainID={chainID} address={address} />}
                </div>
            )}
        </div>
    );
};

export default BuyDialogContent;
