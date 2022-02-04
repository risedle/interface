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
import RedeemForm from "./RedeemForm";

import { ApprovalState } from "./States";
import { getExplorerLink } from "./Explorer";
import ToastInProgress from "../Toasts/InProgress";
import { useTokenAllowance } from "../swr/useTokenAllowance";
import { useTokenBalance } from "../swr/useTokenBalance";

/**
 * RedeemProps is a React Component properties that passed to React Component Redeem
 */
type RedeemProps = {
    address: string;
};

/**
 * Redeem is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Redeem: FunctionComponent<RedeemProps> = ({ address }) => {
    // Global states
    const { account, chain, signer, provider } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const metadata = Metadata[chainID][address];

    // Read onchain data
    const allowanceResponse = useTokenAllowance({ account: account, token: address, spender: metadata.vaultAddress, provider: provider });
    const balanceResponse = useTokenBalance({ account: account, token: address, provider: provider });

    // Parse onchain data
    const allowance = parseFloat(ethers.utils.formatUnits(allowanceResponse.data ? allowanceResponse.data : 0, metadata.collateralDecimals));
    const balance = parseFloat(ethers.utils.formatUnits(balanceResponse.data ? balanceResponse.data : 0, metadata.collateralDecimals));

    // Write operations
    const [, approve] = useContractWrite(
        {
            addressOrName: address,
            contractInterface: erc20ABI,
            signerOrProvider: signer,
        },
        "approve",
        {
            args: [metadata.vaultAddress, ethers.constants.MaxUint256],
        }
    );

    // Local states
    const [approval, setApproval] = useState<ApprovalState>({});

    // UI States
    const showLoading = allowanceResponse.isLoading || balanceResponse.isLoading ? true : false;
    const showError = !showLoading && (allowanceResponse.error || balanceResponse.error) ? true : false;
    const showApprovalOrRedeem = !showLoading && !showError && allowanceResponse.data && balanceResponse.data ? true : false;
    const showApproval = showApprovalOrRedeem && !(allowance > balance) && !approval.approved ? true : false;
    const showRedeem = !showApproval || approval.approved ? true : false;

    return (
        <div>
            {showLoading && <FormLoading />}
            {showError && <FormLoadingFailed />}
            {showApprovalOrRedeem && (
                <div>
                    {showApproval && (
                        <div className="flex flex-col">
                            <div className="border-b border-dashed border-gray-light-5 py-4 dark:border-gray-dark-5">
                                <p className="text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Allow Risedle to use your {metadata.title}</p>
                            </div>
                            <div className="pt-4">
                                {!approval.approving && !approval.confirming && (
                                    <ButtonPositive
                                        full
                                        onClick={async () => {
                                            toast.remove(); // IMPORTANT this is used to prevent metamask popup stuck

                                            try {
                                                setApproval({ confirming: true, approving: false });
                                                const result = await approve();
                                                setApproval({ confirming: false, approving: true });
                                                if (result.error) {
                                                    setApproval({ confirming: false, approving: false });
                                                    toast.custom((t) => <ToastError>{result.error.message}</ToastError>);
                                                    return;
                                                }
                                                setApproval({ confirming: false, approving: true, hash: result.data.hash });
                                                toast.custom((t) => <ToastInProgress>Approving {metadata.title}...</ToastInProgress>);
                                                await result.data.wait();
                                                toast.remove();
                                                toast.custom((t) => <ToastSuccess>{metadata.title} approved</ToastSuccess>);
                                                setApproval({ approving: false, confirming: false, hash: result.data.hash, approved: true });
                                            } catch (e) {
                                                // Wallet rejected etc
                                                console.error(e);
                                                const error = e as Error;
                                                setApproval({ confirming: false, approving: false, error });
                                                toast.custom((t) => <ToastError>{error.message}</ToastError>);
                                            }
                                        }}
                                    >
                                        Approve
                                    </ButtonPositive>
                                )}
                                {approval.confirming && <ButtonLoading full>Waiting for confirmation...</ButtonLoading>}
                                {approval.approving && <ButtonLoading full>Approving...</ButtonLoading>}
                            </div>
                            {approval.hash && (
                                <div className="pt-4 text-center">
                                    <Link href={getExplorerLink(chain.chain, approval.hash)}>
                                        <a target="_blank" rel="noreferrer" className="text-gray-text-center py-4 text-sm text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            <span className="hover:underline">Transaction is submitted</span> &#8599;
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {showRedeem && <RedeemForm address={address} />}
                </div>
            )}
        </div>
    );
};

export default Redeem;
