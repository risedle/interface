import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { erc20ABI, useProvider, useSigner } from "wagmi";
import * as Slider from "@radix-ui/react-slider";
import toast from "react-hot-toast";

import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import ToastError from "../Toasts/Error";
import ToastTransaction from "../Toasts/Transaction";
import ToastSuccess from "../Toasts/Success";

// ABIs
import VaultABI from "./VaultABI";
import { RedeemState, RequestState } from "./States";
import ButtonLoading from "../Buttons/ButtonLoading";
import { getExplorerLink } from "./Explorer";

/**
 * RedeemFormProps is a React Component properties that passed to React Component RedeemForm
 */
type RedeemFormProps = {
    address: string;
    nav: number;
    collateralPrice: number;
};

/**
 * RedeemForm is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const RedeemForm: FunctionComponent<RedeemFormProps> = ({ address, nav, collateralPrice }) => {
    // Global states
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const [, getSigner] = useSigner({ skip: true });

    // Initialize contract
    const vaultContract = new ethers.Contract(metadata.vaultAddress, VaultABI, provider);
    const leveragedTokenContract = new ethers.Contract(address, erc20ABI, provider);

    // Local states
    const [balanceState, setBalanceState] = useState<RequestState>({ loading: true });
    const [redeem, setRedeem] = useState<RedeemState>({ amount: 0 });

    // Load onchain data
    const loadData = async () => {
        if (balanceState.loading) {
            const values = await Promise.all([leveragedTokenContract.balanceOf(account)]);
            setBalanceState({ response: values[0], loading: false });
        }
    };

    // This will be executed when component is mounted or updated
    useEffect(() => {
        loadData();
    });

    const balance = parseFloat(ethers.utils.formatUnits(balanceState.response ? balanceState.response : 0, metadata.collateralDecimals));
    const redeemedValue = redeem.amount ? (redeem.amount * nav) / collateralPrice : 0;
    const minimalRedeemedValue = redeemedValue - redeemedValue * (5 / 100); // rough estimation

    // UI States
    const showNotEnoughBalanceButton = redeem.amount && redeem.amount > balance ? true : false;
    const showRedeemButton = !showNotEnoughBalanceButton;
    const showNormalSlider = !redeem.amount || (redeem.amount && redeem.amount <= balance) ? true : false;
    const showRedSlider = !showNormalSlider;

    return (
        <div className="mt-6">
            <div className="flex flex-row justify-between items-center">
                <p className="text-xs leading-4 font-semibold text-gray-light-12 dark:text-gray-dark-12">How many {metadata.title}?</p>
            </div>
            <form className="flex flex-col mt-2 space-y-4">
                <div className="flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between">
                    {/* Input form */}
                    <div className="grow">
                        <input
                            className="w-full appearance-none outline-none font-ibm text-2xl font-bold bg-clip-text placeholder:bg-clip-text text-transparent placeholder:text-transparent transition-none gradient move-gradient bg-[length:250%_250%] focus:outline-none focus:ring-0 focus:shadow-none"
                            type="number"
                            placeholder="0"
                            min={0}
                            max={balance.toFixed(3)}
                            value={redeem.amount ? redeem.amount.toString() : 0}
                            step={0.001}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setRedeem({ ...redeem, amount: 0 });
                                    return;
                                }
                                const value = parseFloat(e.target.value);
                                setRedeem({ ...redeem, amount: value });
                            }}
                        />
                    </div>

                    {/* Max button */}
                    <div className="flex-none">
                        <button
                            className="outline-none flex flex-row items-center space-x-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setRedeem({ ...redeem, amount: balance });
                            }}
                        >
                            <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="fill-green-light-10 dark:fill-green-dark-10">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.9 1.0001C13.9 0.779184 13.7209 0.600098 13.5 0.600098C13.2791 0.600098 13.1 0.779184 13.1 1.0001V1.6001H12.5C12.2791 1.6001 12.1 1.77918 12.1 2.0001C12.1 2.22101 12.2791 2.4001 12.5 2.4001H13.1V3.0001C13.1 3.22101 13.2791 3.4001 13.5 3.4001C13.7209 3.4001 13.9 3.22101 13.9 3.0001V2.4001H14.5C14.7209 2.4001 14.9 2.22101 14.9 2.0001C14.9 1.77918 14.7209 1.6001 14.5 1.6001H13.9V1.0001ZM11.8536 3.64654C12.0488 3.8418 12.0488 4.15838 11.8536 4.35365L10.8536 5.35365C10.6583 5.54891 10.3417 5.54891 10.1465 5.35365C9.9512 5.15839 9.9512 4.84181 10.1465 4.64655L11.1464 3.64655C11.3417 3.45128 11.6583 3.45128 11.8536 3.64654ZM9.85357 5.64654C10.0488 5.84181 10.0488 6.15839 9.85357 6.35365L2.85355 13.3537C2.65829 13.5489 2.34171 13.5489 2.14645 13.3537C1.95118 13.1584 1.95118 12.8418 2.14645 12.6465L9.14646 5.64654C9.34172 5.45128 9.65831 5.45128 9.85357 5.64654ZM13.5 5.6001C13.7209 5.6001 13.9 5.77918 13.9 6.0001V6.6001H14.5C14.7209 6.6001 14.9 6.77918 14.9 7.0001C14.9 7.22101 14.7209 7.4001 14.5 7.4001H13.9V8.0001C13.9 8.22101 13.7209 8.4001 13.5 8.4001C13.2791 8.4001 13.1 8.22101 13.1 8.0001V7.4001H12.5C12.2791 7.4001 12.1 7.22101 12.1 7.0001C12.1 6.77918 12.2791 6.6001 12.5 6.6001H13.1V6.0001C13.1 5.77918 13.2791 5.6001 13.5 5.6001ZM8.90002 1.0001C8.90002 0.779184 8.72093 0.600098 8.50002 0.600098C8.2791 0.600098 8.10002 0.779184 8.10002 1.0001V1.6001H7.50002C7.2791 1.6001 7.10002 1.77918 7.10002 2.0001C7.10002 2.22101 7.2791 2.4001 7.50002 2.4001H8.10002V3.0001C8.10002 3.22101 8.2791 3.4001 8.50002 3.4001C8.72093 3.4001 8.90002 3.22101 8.90002 3.0001V2.4001H9.50002C9.72093 2.4001 9.90002 2.22101 9.90002 2.0001C9.90002 1.77918 9.72093 1.6001 9.50002 1.6001H8.90002V1.0001Z"
                                />
                            </svg>
                            <p className="text-green-light-10 dark:text-green-dark-10 text-sm tracking-tighter font-semibold">MAX</p>
                        </button>
                    </div>
                </div>

                {/* Balance information */}
                <div className="flex flex-row justify-between">
                    <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10 text-left">
                        Balance: {balance.toFixed(3)} {metadata.title}
                    </p>
                </div>

                {/* Sliders */}
                <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed">
                    {/* mint amount in range, display normal slider */}
                    {showNormalSlider && (
                        <Slider.Root
                            min={0}
                            value={[redeem.amount ? redeem.amount : 0]}
                            max={parseFloat(balance.toFixed(3))}
                            step={0.01}
                            className="relative w-full flex flex-row items-center"
                            onValueChange={(value) => {
                                setRedeem({ ...redeem, amount: value[0] });
                            }}
                        >
                            <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                <Slider.Range className="absolute h-[2px] bg-blue-light-10 dark:bg-blue-dark-10" />
                            </Slider.Track>
                            <Slider.Thumb className="h-[20px] w-[20px] rounded-full bg-gray-light-1 dark:bg-gray-dark-12 border border-gray-light-5 dark:border-0 block" />
                        </Slider.Root>
                    )}

                    {/* mint amount out of range display red slider */}
                    {showRedSlider && (
                        <Slider.Root
                            min={0}
                            value={[balance]}
                            max={parseFloat(balance.toFixed(3))}
                            step={0.01}
                            className="relative w-full flex flex-row items-center"
                            onValueChange={(value) => {
                                setRedeem({ ...redeem, amount: value[0] });
                            }}
                        >
                            <Slider.Track className="relative h-[2px] w-full bg-gray-light-4 dark:bg-gray-dark-4">
                                <Slider.Range className="absolute h-[2px] bg-red-light-11 dark:bg-red-dark-11" />
                            </Slider.Track>
                            <Slider.Thumb className="h-[20px] w-[20px] rounded-full bg-gray-light-1 dark:bg-gray-dark-12 border border-gray-light-5 dark:border-0 block" />
                        </Slider.Root>
                    )}
                </div>

                {/* Exhange rate */}
                <div className="text-center">
                    <p className="text-xs leading-4 text-gray-light-10 dark:text-gray-dark-10">
                        You will get{" "}
                        <span className="font-semibold text-gray-light-12 dark:text-gray-dark-12">
                            {minimalRedeemedValue.toFixed(5)} {metadata.collateralSymbol}
                        </span>{" "}
                        at minimum
                    </p>
                </div>

                {/* Buttons */}
                <div className="text-center w-full">
                    {/* Dislay disabled button with not enough balance */}
                    {showNotEnoughBalanceButton && (
                        <button disabled className="bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 text-sm leading-4 tracking-tighter font-semibold text-gray-light-10 dark:text-gray-dark-10 cursor-not-allowed py-[11px] w-full rounded-full">
                            Not enough balance
                        </button>
                    )}

                    {showRedeemButton && (
                        <div>
                            {!redeem.redeeming && (
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        // Set redeeming in progress
                                        setRedeem({ ...redeem, redeeming: true });

                                        // Get signer otherwise return early
                                        const signer = await getSigner();
                                        console.debug("Redeem: signer", signer);
                                        if (!signer) {
                                            toast.custom((t) => <ToastError>No signer detected</ToastError>);
                                            setRedeem({ ...redeem, redeeming: false, error: new Error("Signer is not detected") });
                                            return;
                                        }

                                        try {
                                            const connectedContract = vaultContract.connect(signer);
                                            const result = await connectedContract.redeem(address, ethers.utils.parseUnits(redeem.amount ? redeem.amount.toString() : "0", metadata.collateralDecimals));
                                            setRedeem({ ...redeem, redeeming: true, hash: result.hash });
                                            toast.custom((t) => <ToastTransaction hash={result.hash}>Redeeming</ToastTransaction>);
                                            const receipt = await result.wait();
                                            if (receipt.status === 1) {
                                                // success
                                                const event = receipt.logs[receipt.logs.length - 1];
                                                const confirmedRedeemendAmount = ethers.utils.formatUnits(event.data, metadata.collateralDecimals);
                                                toast.remove();
                                                toast.custom((t) => (
                                                    <ToastSuccess>
                                                        Successfully redeemed {parseFloat(confirmedRedeemendAmount).toFixed(3)} {metadata.collateralSymbol}
                                                    </ToastSuccess>
                                                ));
                                                setRedeem({ ...redeem, amount: 0, redeeming: false, hash: undefined });
                                                setBalanceState({ loading: true });
                                            } else {
                                                setRedeem({ ...redeem, error: new Error("Something wrong with the receipt") });
                                                toast.custom((t) => <ToastError>Something wrong with the receipt</ToastError>);
                                            }
                                        } catch (e) {
                                            const error = e as Error;
                                            toast.custom((t) => <ToastError>{error.message}</ToastError>);
                                            setRedeem({ ...redeem, redeeming: false, error });
                                            console.error(e);
                                        }
                                    }}
                                    className="bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-sm leading-4 tracking-tighter font-semibold text-gray-light-1 dark:text-blue-light-1 py-[11px] w-full rounded-full"
                                >
                                    Redeem
                                </button>
                            )}

                            {redeem.redeeming && <ButtonLoading full>Redeeming...</ButtonLoading>}
                        </div>
                    )}
                </div>

                {/* Display transaction hash */}
                {redeem.hash && (
                    <div className="text-center">
                        <Link href={getExplorerLink(chain, redeem.hash)}>
                            <a target="_blank" rel="noreferrer" className="text-sm py-4 text-gray-text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                <span className="hover:underline">Goto transaction</span> &#8599;
                            </a>
                        </Link>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RedeemForm;
