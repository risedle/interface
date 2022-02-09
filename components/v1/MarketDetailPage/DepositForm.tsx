import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { erc20ABI, useContractWrite, useProvider, useSigner } from "wagmi";
import * as Slider from "@radix-ui/react-slider";
import toast from "react-hot-toast";

import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import ToastError from "../Toasts/Error";
import ToastSuccess from "../Toasts/Success";

import { DepositState } from "./States";
import ButtonLoading from "../Buttons/ButtonLoading";
import { getExplorerLink } from "./Explorer";
import ToastInProgress from "../Toasts/InProgress";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { VaultABI } from "../../../abis/VaultABI";
import { useVaultExchangeRate } from "../swr/useVaultExchangeRate";
import { useTokenBalance } from "../swr/useTokenBalance";
import FormLoading from "./FormLoading";
import FormLoadingFailed from "./FormLoadingFailed";

/**
 * DepositFormProps is a React Component properties that passed to React Component DepositForm
 */
type DepositFormProps = {
    address: string;
};

/**
 * DepositForm is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const DepositForm: FunctionComponent<DepositFormProps> = ({ address }) => {
    // Global states
    const { account, chain, provider, signer } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Read onchain data
    const balanceResponse = useTokenBalance({ account: account, token: metadata.debtAddress, provider: provider });
    const exchangeRateResponse = useVaultExchangeRate({ vault: metadata.vaultAddress, provider: provider });

    // Parse onchain data
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, metadata.debtDecimals));
    const exchangeRate = parseFloat(ethers.utils.formatUnits(exchangeRateResponse.data ? exchangeRateResponse.data : 0, 18)); // In ether units

    // Local states
    const [depositState, setDepositState] = useState<DepositState>({ amount: 0 });
    const rvTokenAmount = depositState.amount ? depositState.amount / exchangeRate : 0;

    // Prepare writing onchain data based on the state
    const [, deposit] = useContractWrite(
        {
            addressOrName: metadata.vaultAddress,
            contractInterface: VaultABI,
            signerOrProvider: signer,
        },
        "addSupply",
        {
            args: [ethers.utils.parseUnits(depositState.amount ? depositState.amount.toString() : "0", metadata.debtDecimals)],
        }
    );

    // UI States
    const showLoading = balanceResponse.isLoading ? true : false;
    const showError = !showLoading && (balanceResponse.error || exchangeRateResponse.error) ? true : false;
    const showForm = !showLoading && !showError;

    const showNotEnoughBalanceButton = depositState.amount && depositState.amount > balance ? true : false;
    const showRedeemButton = !showNotEnoughBalanceButton;
    const showNormalSlider = !depositState.amount || (depositState.amount && depositState.amount <= balance) ? true : false;
    const showRedSlider = !showNormalSlider;

    return (
        <div>
            {showLoading && <FormLoading />}
            {showError && <FormLoadingFailed />}
            {showForm && (
                <div className="mt-6">
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-xs font-semibold leading-4 text-gray-light-12 dark:text-gray-dark-12">How many {metadata.debtSymbol}?</p>
                    </div>
                    <form className="mt-2 flex flex-col space-y-4">
                        <div className="flex flex-row items-center justify-between rounded-[8px] bg-gray-light-3 p-4 dark:bg-gray-dark-3">
                            {/* Input form */}
                            <div className="grow">
                                <input
                                    className="gradient move-gradient w-full appearance-none bg-[length:250%_250%] bg-clip-text font-ibm text-2xl font-bold text-transparent outline-none transition-none placeholder:bg-clip-text placeholder:text-transparent focus:shadow-none focus:outline-none focus:ring-0"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    max={tokenBalanceFormatter.format(balance)}
                                    value={depositState.amount ? tokenBalanceFormatter.format(depositState.amount) : 0}
                                    step={0.001}
                                    onChange={(e) => {
                                        if (e.target.value === "") {
                                            setDepositState({ ...depositState, amount: 0 });
                                            return;
                                        }
                                        const value = parseFloat(e.target.value);
                                        setDepositState({ ...depositState, amount: tokenBalanceFormatter.format(value) });
                                    }}
                                />
                            </div>

                            {/* Max button */}
                            <div className="flex-none">
                                <button
                                    className="flex flex-row items-center space-x-2 outline-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDepositState({ ...depositState, amount: tokenBalanceFormatter.format(balance) });
                                    }}
                                >
                                    <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-green-light-10 dark:fill-green-dark-10">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.9 1.0001C13.9 0.779184 13.7209 0.600098 13.5 0.600098C13.2791 0.600098 13.1 0.779184 13.1 1.0001V1.6001H12.5C12.2791 1.6001 12.1 1.77918 12.1 2.0001C12.1 2.22101 12.2791 2.4001 12.5 2.4001H13.1V3.0001C13.1 3.22101 13.2791 3.4001 13.5 3.4001C13.7209 3.4001 13.9 3.22101 13.9 3.0001V2.4001H14.5C14.7209 2.4001 14.9 2.22101 14.9 2.0001C14.9 1.77918 14.7209 1.6001 14.5 1.6001H13.9V1.0001ZM11.8536 3.64654C12.0488 3.8418 12.0488 4.15838 11.8536 4.35365L10.8536 5.35365C10.6583 5.54891 10.3417 5.54891 10.1465 5.35365C9.9512 5.15839 9.9512 4.84181 10.1465 4.64655L11.1464 3.64655C11.3417 3.45128 11.6583 3.45128 11.8536 3.64654ZM9.85357 5.64654C10.0488 5.84181 10.0488 6.15839 9.85357 6.35365L2.85355 13.3537C2.65829 13.5489 2.34171 13.5489 2.14645 13.3537C1.95118 13.1584 1.95118 12.8418 2.14645 12.6465L9.14646 5.64654C9.34172 5.45128 9.65831 5.45128 9.85357 5.64654ZM13.5 5.6001C13.7209 5.6001 13.9 5.77918 13.9 6.0001V6.6001H14.5C14.7209 6.6001 14.9 6.77918 14.9 7.0001C14.9 7.22101 14.7209 7.4001 14.5 7.4001H13.9V8.0001C13.9 8.22101 13.7209 8.4001 13.5 8.4001C13.2791 8.4001 13.1 8.22101 13.1 8.0001V7.4001H12.5C12.2791 7.4001 12.1 7.22101 12.1 7.0001C12.1 6.77918 12.2791 6.6001 12.5 6.6001H13.1V6.0001C13.1 5.77918 13.2791 5.6001 13.5 5.6001ZM8.90002 1.0001C8.90002 0.779184 8.72093 0.600098 8.50002 0.600098C8.2791 0.600098 8.10002 0.779184 8.10002 1.0001V1.6001H7.50002C7.2791 1.6001 7.10002 1.77918 7.10002 2.0001C7.10002 2.22101 7.2791 2.4001 7.50002 2.4001H8.10002V3.0001C8.10002 3.22101 8.2791 3.4001 8.50002 3.4001C8.72093 3.4001 8.90002 3.22101 8.90002 3.0001V2.4001H9.50002C9.72093 2.4001 9.90002 2.22101 9.90002 2.0001C9.90002 1.77918 9.72093 1.6001 9.50002 1.6001H8.90002V1.0001Z"
                                        />
                                    </svg>
                                    <p className="text-sm font-semibold tracking-tighter text-green-light-10 dark:text-green-dark-10">MAX</p>
                                </button>
                            </div>
                        </div>

                        {/* Balance information */}
                        <div className="flex flex-row justify-between">
                            <p className="text-left text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                                Balance: {tokenBalanceFormatter.format(balance)} {metadata.debtSymbol}
                            </p>
                        </div>

                        {/* Sliders */}
                        <div className="border-b border-dashed border-gray-light-5 pt-4 pb-8 dark:border-gray-dark-5">
                            {/* mint amount in range, display normal slider */}
                            {showNormalSlider && (
                                <Slider.Root
                                    min={0}
                                    value={[depositState.amount ? tokenBalanceFormatter.format(depositState.amount) : 0]}
                                    max={tokenBalanceFormatter.format(balance)}
                                    step={0.01}
                                    className="relative flex w-full flex-row items-center"
                                    onValueChange={(value) => {
                                        setDepositState({ ...depositState, amount: tokenBalanceFormatter.format(value[0]) });
                                    }}
                                >
                                    <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                        <Slider.Range className="absolute h-[2px] bg-blue-light-10 dark:bg-blue-dark-10" />
                                    </Slider.Track>
                                    <Slider.Thumb className="block h-[20px] w-[20px] rounded-full border border-gray-light-5 bg-gray-light-1 dark:border-0 dark:bg-gray-dark-12" />
                                </Slider.Root>
                            )}

                            {/* mint amount out of range display red slider */}
                            {showRedSlider && (
                                <Slider.Root
                                    min={0}
                                    value={[tokenBalanceFormatter.format(balance)]}
                                    max={tokenBalanceFormatter.format(balance)}
                                    step={0.01}
                                    className="relative flex w-full flex-row items-center"
                                    onValueChange={(value) => {
                                        setDepositState({ ...depositState, amount: tokenBalanceFormatter.format(value[0]) });
                                    }}
                                >
                                    <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                        <Slider.Range className="absolute h-[2px] bg-red-light-11 dark:bg-red-dark-11" />
                                    </Slider.Track>
                                    <Slider.Thumb className="block h-[20px] w-[20px] rounded-full border border-gray-light-5 bg-gray-light-1 dark:border-0 dark:bg-gray-dark-12" />
                                </Slider.Root>
                            )}
                        </div>

                        {/* Exhange rate */}
                        <div className="text-center">
                            <p className="flex justify-center text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                                You will get
                                <span className="ml-1 flex font-semibold text-gray-light-12 dark:text-gray-dark-12">
                                    {exchangeRateResponse.isLoading ? (
                                        <svg width="17" height="16" viewBox="0 0 17 16" className="mx-2 animate-spin fill-gray-light-12 dark:fill-gray-dark-12" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_1161_30088)">
                                                <path opacity="0.2" d="M16.5 8.00049C16.5 12.4188 12.9183 16.0005 8.5 16.0005C4.08172 16.0005 0.5 12.4188 0.5 8.00049C0.5 3.58221 4.08172 0.000488281 8.5 0.000488281C12.9183 0.000488281 16.5 3.58221 16.5 8.00049ZM2.9 8.00049C2.9 11.0933 5.40721 13.6005 8.5 13.6005C11.5928 13.6005 14.1 11.0933 14.1 8.00049C14.1 4.90769 11.5928 2.40049 8.5 2.40049C5.40721 2.40049 2.9 4.90769 2.9 8.00049Z" />
                                                <path d="M15.3 8.00049C15.9627 8.00049 16.5092 8.5407 16.4102 9.196C16.3136 9.83526 16.1396 10.4619 15.891 11.062C15.489 12.0326 14.8997 12.9145 14.1569 13.6573C13.414 14.4002 12.5321 14.9895 11.5615 15.3915C10.9614 15.6401 10.3348 15.814 9.69551 15.9107C9.04021 16.0097 8.5 15.4632 8.5 14.8005C8.5 14.1377 9.04326 13.6133 9.69084 13.4724C10.0157 13.4017 10.3344 13.3021 10.643 13.1742C11.3224 12.8928 11.9398 12.4803 12.4598 11.9603C12.9798 11.4403 13.3923 10.8229 13.6737 10.1435C13.8016 9.83489 13.9012 9.51619 13.9719 9.19133C14.1129 8.54375 14.6373 8.00049 15.3 8.00049Z" />
                                            </g>
                                        </svg>
                                    ) : (
                                        tokenBalanceFormatter.format(rvTokenAmount)
                                    )}{" "}
                                    {metadata.vaultTitle}
                                </span>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="w-full text-center">
                            {/* Dislay disabled button with not enough balance */}
                            {showNotEnoughBalanceButton && (
                                <button disabled className="w-full cursor-not-allowed rounded-full border border-gray-light-5 bg-gray-light-4 py-[11px] text-sm font-semibold leading-4 tracking-tighter text-gray-light-10 dark:border-gray-dark-5 dark:bg-gray-dark-4 dark:text-gray-dark-10">
                                    Not enough balance
                                </button>
                            )}

                            {showRedeemButton && (
                                <div>
                                    {!depositState.depositing && !depositState.confirming && (
                                        <button
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                toast.remove(); // IMPORTANT this is used to prevent metamask popup stuck

                                                setDepositState({ ...depositState, confirming: true, depositing: false });

                                                try {
                                                    const result = await deposit();
                                                    if (result.error) {
                                                        setDepositState({ ...depositState, confirming: false, depositing: false });
                                                        toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                                                        return;
                                                    }
                                                    setDepositState({ ...depositState, confirming: false, depositing: true, hash: result.data.hash });
                                                    toast.remove();
                                                    toast.custom((t) => (
                                                        <ToastInProgress>
                                                            Depositing {tokenBalanceFormatter.format(depositState.amount)} {metadata.debtSymbol}...
                                                        </ToastInProgress>
                                                    ));
                                                    const receipt = await result.data.wait();
                                                    if (receipt.status === 1) {
                                                        toast.remove();
                                                        toast.custom((t) => (
                                                            <ToastSuccess>
                                                                Successfully deposit {tokenBalanceFormatter.format(depositState.amount)} {metadata.debtSymbol}
                                                            </ToastSuccess>
                                                        ));
                                                        setDepositState({ ...depositState, amount: 0, depositing: false, hash: undefined });
                                                    } else {
                                                        setDepositState({ ...depositState, error: new Error("Something wrong with the receipt") });
                                                        toast.remove();
                                                        toast.custom((t) => <ToastError>Something wrong with the receipt</ToastError>);
                                                    }
                                                } catch (e) {
                                                    // Wallet rejected etc
                                                    const error = e as Error;
                                                    toast.remove();
                                                    if (error.message) {
                                                        toast.custom((t) => <ToastError>{error.message}</ToastError>);
                                                    } else {
                                                        toast.custom((t) => <ToastError>{error}</ToastError>);
                                                    }
                                                    setDepositState({ ...depositState, depositing: false, error });
                                                    console.error(e);
                                                }
                                            }}
                                            className="w-full rounded-full border border-blue-light-11 bg-blue-light-10 py-[11px] text-sm font-semibold leading-4 tracking-tighter text-gray-light-1 dark:border-blue-dark-11 dark:bg-blue-dark-10 dark:text-blue-light-1"
                                        >
                                            Deposit
                                        </button>
                                    )}

                                    {depositState.confirming && <ButtonLoading full>Waiting for confirmation...</ButtonLoading>}
                                    {depositState.depositing && <ButtonLoading full>Depositing...</ButtonLoading>}
                                </div>
                            )}
                        </div>

                        {/* Display transaction hash */}
                        {depositState.hash && (
                            <div className="text-center">
                                <Link href={getExplorerLink(chain.chain, depositState.hash)}>
                                    <a target="_blank" rel="noreferrer" className="text-gray-text-center py-4 text-sm text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                        <span className="hover:underline">Transaction is submitted</span> &#8599;
                                    </a>
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default DepositForm;
