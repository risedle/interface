import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { erc20ABI, useContractWrite } from "wagmi";
import toast from "react-hot-toast";

import { DEFAULT_CHAIN, useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import ToastError from "../Toasts/Error";
import ToastSuccess from "../Toasts/Success";
import FormLoading from "./FormLoading";
import FormLoadingFailed from "./FormLoadingFailed";
import ButtonPositive from "../Buttons/ButtonPositive";
import ButtonLoading from "../Buttons/ButtonLoading";

import { ApprovalState } from "./States";
import { getExplorerLink } from "./Explorer";
import WithdrawForm from "./WithdrawForm";
import ToastInProgress from "../Toasts/InProgress";
import { useTokenAllowance } from "../swr/useTokenAllowance";
import { useTokenBalance } from "../swr/useTokenBalance";

/**
 * WithdrawProps is a React Component properties that passed to React Component Withdraw
 */
type WithdrawProps = {
    address: string;
};

/**
 * Withdraw is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Withdraw: FunctionComponent<WithdrawProps> = ({ address }) => {
    // Global states
    const { account, chain, provider, signer } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Read onchain data
    const allowanceResponse = useTokenAllowance({ account: account, token: metadata.vaultAddress, spender: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: metadata.vaultAddress, provider: provider });

    // Parse onchain data
    const allowance = parseFloat(ethers.utils.formatUnits(allowanceResponse.data ? allowanceResponse.data : 0, metadata.debtDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, metadata.debtDecimals));

    // Write operations
    const [, approve] = useContractWrite(
        {
            addressOrName: metadata.vaultAddress,
            contractInterface: erc20ABI,
            signerOrProvider: signer,
        },
        "approve",
        {
            args: [metadata.vaultAddress, ethers.constants.MaxUint256],
        }
    );

    // Local states
    const [approvalState, setApprovalState] = useState<ApprovalState>({});

    // UI States
    const showLoading = allowanceResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = !showLoading && allowanceResponse.error && allowanceResponse.error ? true : false;
    const showApprovalOrWithdraw = !showLoading && !showError && allowanceResponse.data && balanceResponse.data ? true : false;
    const showApproval = showApprovalOrWithdraw && !(allowance > balance) && !approvalState.approved ? true : false;
    const showWithdraw = !showApproval || approvalState.approved ? true : false;

    return (
        <div>
            {showLoading && <FormLoading />}
            {showError && <FormLoadingFailed />}
            {showApprovalOrWithdraw && (
                <div>
                    {showApproval && (
                        <div className="flex flex-col">
                            <div className="border-b border-dashed border-gray-light-5 py-4 dark:border-gray-dark-5">
                                <p className="text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Allow Risedle to use your {metadata.vaultTitle}</p>
                            </div>
                            <div className="pt-4">
                                {!approvalState.approving && !approvalState.confirming && (
                                    <ButtonPositive
                                        full
                                        onClick={async () => {
                                            toast.remove(); // IMPORTANT this is used to prevent metamask popup stuck

                                            try {
                                                setApprovalState({ confirming: true, approving: false });
                                                const result = await approve();
                                                setApprovalState({ confirming: false, approving: true });
                                                if (result.error) {
                                                    setApprovalState({ confirming: false, approving: false });
                                                    toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                                                    return;
                                                }
                                                setApprovalState({ confirming: false, approving: true, hash: result.data.hash });
                                                toast.custom((t) => <ToastInProgress>Approving {metadata.vaultTitle}...</ToastInProgress>);
                                                await result.data.wait();
                                                toast.remove();
                                                toast.custom((t) => <ToastSuccess>{metadata.vaultTitle} approved</ToastSuccess>);
                                                setApprovalState({ approving: false, confirming: false, hash: result.data.hash, approved: true });
                                            } catch (e) {
                                                // Wallet rejected etc
                                                console.error(e);
                                                const error = e as Error;
                                                setApprovalState({ confirming: false, approving: false, error });
                                                if (error.message) {
                                                    toast.custom((t) => <ToastError>{error.message}</ToastError>);
                                                } else {
                                                    toast.custom((t) => <ToastError>{error}</ToastError>);
                                                }
                                            }
                                        }}
                                    >
                                        Approve
                                    </ButtonPositive>
                                )}
                                {approvalState.confirming && <ButtonLoading full>Waiting for confirmation...</ButtonLoading>}
                                {approvalState.approving && <ButtonLoading full>Approving...</ButtonLoading>}
                            </div>
                            {approvalState.hash && (
                                <div className="pt-4 text-center">
                                    <Link href={getExplorerLink(chain.chain, approvalState.hash)}>
                                        <a target="_blank" rel="noreferrer" className="text-gray-text-center py-4 text-sm text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            <span className="hover:underline">Transaction is submitted</span> &#8599;
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {showWithdraw && <WithdrawForm address={address} />}
                </div>
            )}
        </div>
    );
};

export default Withdraw;
