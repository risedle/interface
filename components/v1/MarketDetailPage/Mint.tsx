import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { useProvider } from "wagmi";
import { Result } from "ethers/lib/utils";

import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { ethers } from "ethers";
import MintForm from "./MintForm";
import FormLoading from "./FormLoading";
import FormLoadingFailed from "./FormLoadingFailed";
import { RequestState } from "./States";

// ABIs
import VaultABI from "./VaultABI";
import OracleABI from "./OracleABI";

/**
 * MintProps is a React Component properties that passed to React Component Mint
 */
type MintProps = {
    address: string;
};

/**
 * Mint is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Mint: FunctionComponent<MintProps> = ({ address }) => {
    // Global states
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();

    // Contracts
    const vaultContract = new ethers.Contract(metadata.vaultAddress, VaultABI, provider);
    const oracleContract = new ethers.Contract(metadata.oracleAddress, OracleABI, provider);

    // Local states
    const [balanceState, setBalanceState] = useState<RequestState>({ loading: true });
    const [tokenMetadataState, setTokenMetadataState] = useState<RequestState>({ loading: true });
    const [collateralPriceState, setCollateralPriceState] = useState<RequestState>({ loading: true });
    const [totalAvailableCashState, setTotalAvailableCashState] = useState<RequestState>({ loading: true });
    const [navState, setNAVState] = useState<RequestState>({ loading: true });

    // Load onchain data
    const loadData = async () => {
        if (balanceState.loading && account && tokenMetadataState.loading && collateralPriceState.loading && totalAvailableCashState.loading && navState.loading) {
            const values = await Promise.all([provider.getBalance(account), vaultContract.getMetadata(address), oracleContract.getPrice(), vaultContract.getTotalAvailableCash(), vaultContract.getNAV(address)]);
            const balanceResponse = values[0] as unknown as Result;
            setBalanceState({ response: balanceResponse, loading: false });
            setTokenMetadataState({ response: values[1], loading: false });
            setCollateralPriceState({ response: values[2], loading: false });
            setTotalAvailableCashState({ response: values[3], loading: false });
            setNAVState({ response: values[4], loading: false });
        }
    };

    // This will be executed when component is mounted or updated
    useEffect(() => {
        loadData();
    });

    // Data
    // First order UI states
    const showLoading = balanceState.loading || tokenMetadataState.loading || totalAvailableCashState.loading || collateralPriceState.loading || navState.loading ? true : false;
    const showError = !showLoading && (balanceState.error || tokenMetadataState.error || totalAvailableCashState.error || collateralPriceState.error || navState.error) ? true : false;
    // TODO: show ApprovalOrMaxCapOrMintForm
    const showMintFormOrMaxCap = !showLoading && !showError && balanceState.response && tokenMetadataState.response && totalAvailableCashState.response && collateralPriceState.response && navState.response ? true : false;

    // Data
    const balance = parseFloat(ethers.utils.formatUnits(balanceState.response ? balanceState.response : 0, metadata.collateralDecimals));
    const maxTotalCollateral = parseFloat(ethers.utils.formatUnits(tokenMetadataState.response ? tokenMetadataState.response.maxTotalCollateral : 0, metadata.collateralDecimals));
    const totalCollateralPlusFee = parseFloat(ethers.utils.formatUnits(tokenMetadataState.response ? tokenMetadataState.response.totalCollateralPlusFee : 0, metadata.collateralDecimals));
    const totalPendingFees = parseFloat(ethers.utils.formatUnits(tokenMetadataState.response ? tokenMetadataState.response.totalPendingFees : 0, metadata.collateralDecimals));
    const collateralPrice = parseFloat(ethers.utils.formatUnits(collateralPriceState.response ? collateralPriceState.response : 0, metadata.debtDecimals));
    const totalAvailableCash = parseFloat(ethers.utils.formatUnits(totalAvailableCashState.response ? totalAvailableCashState.response : 0, metadata.debtDecimals));
    const nav = parseFloat(ethers.utils.formatUnits(navState.response ? navState.response : 0, metadata.debtDecimals));

    // Second order UI states
    const showMaxCap = maxTotalCollateral > 0 && totalCollateralPlusFee - totalPendingFees > maxTotalCollateral ? true : false;
    const showMintForm = !showMaxCap;

    // Data

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
                        <div className="flex flex-col mt-4 space-y-4">
                            <div className="flex flex-row space-x-2 bg-yellow-light-2 dark:bg-yellow-dark-2 border border-yellow-light-5 dark:border-yellow-dark-5 rounded-[8px] items-center p-4">
                                <svg className="fill-yellow-light-12 dark:fill-yellow-dark-12" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.4449 1.10861C8.0183 0.392832 6.9817 0.392832 6.55509 1.10861L0.161178 11.8367C-0.275824 12.5699 0.252503 13.4998 1.10608 13.4998H13.8939C14.7475 13.4998 15.2758 12.5699 14.8388 11.8367L8.4449 1.10861ZM7.4141 1.62058C7.45288 1.55551 7.54712 1.55551 7.5859 1.62058L13.9798 12.3486C14.0196 12.4153 13.9715 12.4998 13.8939 12.4998H1.10608C1.02849 12.4998 0.980454 12.4153 1.02018 12.3486L7.4141 1.62058ZM6.8269 4.98596C6.81221 4.60408 7.11783 4.28648 7.5 4.28648C7.88217 4.28648 8.18778 4.60408 8.1731 4.98596L8.01921 8.98686C8.00848 9.26585 7.7792 9.48649 7.5 9.48649C7.2208 9.48649 6.99151 9.26585 6.98078 8.98686L6.8269 4.98596ZM8.24989 10.9758C8.24989 11.3901 7.9141 11.7258 7.49989 11.7258C7.08567 11.7258 6.74989 11.3901 6.74989 10.9758C6.74989 10.5616 7.08567 10.2258 7.49989 10.2258C7.9141 10.2258 8.24989 10.5616 8.24989 10.9758Z"
                                    />
                                </svg>
                                <p className="text-yellow-light-12 dark:text-yellow-dark-12 text-xs">Max cap is reached</p>
                            </div>
                            <div className="border-b border-gray-light-3 dark:border-gray-dark-3 border-dashed pb-4">
                                <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">Buy {metadata.title} directly from Uniswap</p>
                            </div>
                            <Link href={metadata.uniswapSwapURL}>
                                <a className="rounded-full bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-center font-semibold text-sm tracking-tighter text-gray-light-1 dark:text-blue-light-1 py-[9px]" target="_blank" rel="noreferrer">
                                    Buy on Uniswap
                                </a>
                            </Link>
                        </div>
                    )}

                    {/* Show mint input */}
                    {showMintForm && <MintForm address={address} balance={balance} nav={nav} maxTotalCollateral={maxTotalCollateral} totalCollateralPlusFee={totalCollateralPlusFee} totalPendingFees={totalPendingFees} totalAvailableCash={totalAvailableCash} collateralPrice={collateralPrice} />}
                </div>
            )}
        </div>
    );
};

export default Mint;
