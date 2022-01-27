import { FunctionComponent } from "react";
import Link from "next/link";
import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { ethers } from "ethers";
import { useBalance, useContractRead } from "wagmi";
import MintForm from "./MintForm";

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
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];

    // Get onchain market data
    const [onchainETHRISEMetadata] = useContractRead(
        {
            addressOrName: metadata.vaultAddress,
            contractInterface: VaultABI,
        },
        "getMetadata",
        {
            args: address,
        }
    );
    // Get onchain oracle
    const [onchainOracle] = useContractRead(
        {
            addressOrName: metadata.oracleAddress,
            contractInterface: OracleABI,
        },
        "getPrice"
    );
    // Get total available cash of vault
    const [onchainTotalAvailableCash] = useContractRead(
        {
            addressOrName: metadata.vaultAddress,
            contractInterface: VaultABI,
        },
        "getTotalAvailableCash"
    );
    // Get the latest NAV of the leveraged token
    const [onchainNAV] = useContractRead(
        {
            addressOrName: metadata.vaultAddress,
            contractInterface: VaultABI,
        },
        "getNAV",
        {
            args: address,
        }
    );
    // Get the user balance
    const [onchainBalance] = useBalance({ addressOrName: account ? account : undefined });

    const balance = onchainBalance && onchainBalance.data && onchainBalance.data.formatted ? parseFloat(onchainBalance.data.formatted) : 0;

    // Check wether the max cap is reached or not
    const maxTotalCollateral = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.maxTotalCollateral : 0, metadata.collateralDecimals));
    const totalCollateralPlusFee = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.totalCollateralPlusFee : 0, metadata.collateralDecimals));
    const totalPendingFees = parseFloat(ethers.utils.formatUnits(onchainETHRISEMetadata.data ? onchainETHRISEMetadata.data.totalPendingFees : 0, metadata.collateralDecimals));

    const collateralPrice = parseFloat(ethers.utils.formatUnits(onchainOracle.data ? onchainOracle.data : 0, metadata.debtDecimals));
    const totalAvailableCash = parseFloat(ethers.utils.formatUnits(onchainTotalAvailableCash.data ? onchainTotalAvailableCash.data : 0, metadata.debtDecimals));
    const tokenNAV = parseFloat(ethers.utils.formatUnits(onchainNAV.data ? onchainNAV.data : 0, metadata.debtDecimals));

    // First order UI states
    const showLoading = onchainETHRISEMetadata.loading || onchainOracle.loading || onchainTotalAvailableCash.loading || onchainNAV.loading || onchainBalance.loading ? true : false;
    const showError = !showLoading && (onchainETHRISEMetadata.error || onchainOracle.error || onchainTotalAvailableCash.error || onchainNAV.error || onchainBalance.error) ? true : false;
    // TODO: show ApprovalOrMaxCapOrMintForm
    const showMintFormOrMaxCap = !showLoading && !showError && onchainETHRISEMetadata.data && onchainOracle.data && onchainTotalAvailableCash.data && onchainNAV.data ? true : false;

    // Second order UI states
    const showMaxCap = maxTotalCollateral > 0 && totalCollateralPlusFee - totalPendingFees > maxTotalCollateral ? true : false;
    const showMintForm = !showMaxCap;

    return (
        <div>
            {/* Show loading states */}
            {showLoading && (
                <div className="mt-6">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {metadata.collateralSymbol}?</p>
                    </div>
                    <form className="flex flex-col mt-2 space-y-4">
                        <div className="h-[64px] animate-pulse flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between"></div>

                        <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>

                        <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed h-[50px]"></div>

                        <button className="cursor-wait flex flex-row text-center justify-center space-x-2 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 text-blue-dark-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full drop-shadow-[0_0_45px_rgba(54,158,255,0.1)]">
                            <svg width="17" height="16" viewBox="0 0 17 16" className="fill-gray-light-12 dark:fill-gray-dark-12 animate-spin" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1161_30088)">
                                    <path opacity="0.2" d="M16.5 8.00049C16.5 12.4188 12.9183 16.0005 8.5 16.0005C4.08172 16.0005 0.5 12.4188 0.5 8.00049C0.5 3.58221 4.08172 0.000488281 8.5 0.000488281C12.9183 0.000488281 16.5 3.58221 16.5 8.00049ZM2.9 8.00049C2.9 11.0933 5.40721 13.6005 8.5 13.6005C11.5928 13.6005 14.1 11.0933 14.1 8.00049C14.1 4.90769 11.5928 2.40049 8.5 2.40049C5.40721 2.40049 2.9 4.90769 2.9 8.00049Z" />
                                    <path d="M15.3 8.00049C15.9627 8.00049 16.5092 8.5407 16.4102 9.196C16.3136 9.83526 16.1396 10.4619 15.891 11.062C15.489 12.0326 14.8997 12.9145 14.1569 13.6573C13.414 14.4002 12.5321 14.9895 11.5615 15.3915C10.9614 15.6401 10.3348 15.814 9.69551 15.9107C9.04021 16.0097 8.5 15.4632 8.5 14.8005C8.5 14.1377 9.04326 13.6133 9.69084 13.4724C10.0157 13.4017 10.3344 13.3021 10.643 13.1742C11.3224 12.8928 11.9398 12.4803 12.4598 11.9603C12.9798 11.4403 13.3923 10.8229 13.6737 10.1435C13.8016 9.83489 13.9012 9.51619 13.9719 9.19133C14.1129 8.54375 14.6373 8.00049 15.3 8.00049Z" />
                                </g>
                            </svg>
                            <div>Loading data...</div>
                        </button>
                    </form>
                </div>
            )}

            {/* Show error states */}
            {showError && (
                <div className="mt-6">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {metadata.collateralSymbol}?</p>
                    </div>
                    <form className="flex flex-col mt-2 space-y-4">
                        <div className="h-[64px] animate-pulse flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between"></div>

                        <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>

                        <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed h-[50px]"></div>

                        <button className="cursor-not-allowed flex flex-row text-center justify-center items-center space-x-2 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 text-blue-dark-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full">
                            <span className="w-[8px] h-[8px] rounded-full bg-red-light-10 dark:bg-red-dark-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:shadow-red-dark-10 inline-block mr-2"></span>
                            <div>Failed to load data</div>
                        </button>
                    </form>
                </div>
            )}

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
                    {showMintForm && <MintForm address={address} balance={balance} nav={tokenNAV} maxTotalCollateral={maxTotalCollateral} totalCollateralPlusFee={totalCollateralPlusFee} totalPendingFees={totalPendingFees} totalAvailableCash={totalAvailableCash} collateralPrice={collateralPrice} />}
                </div>
            )}
        </div>
    );
};

export default Mint;
