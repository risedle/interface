import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { erc20ABI, useProvider, useSigner } from "wagmi";
import toast from "react-hot-toast";

import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import ToastError from "../Toasts/Error";
import ToastSuccess from "../Toasts/Success";
import FormLoading from "./FormLoading";
import FormLoadingFailed from "./FormLoadingFailed";
import ButtonPositive from "../Buttons/ButtonPositive";
import ButtonLoading from "../Buttons/ButtonLoading";

import { RequestState, ApprovalState } from "./States";
import { getExplorerLink } from "./Explorer";
import WithdrawForm from "./WithdrawForm";
import ToastInProgress from "../Toasts/InProgress";

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
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const [signerData] = useSigner();

    // Initialize contracts
    const tokenContract = new ethers.Contract(metadata.vaultAddress, erc20ABI, provider);

    // Local states
    const [allowanceState, setAllowanceState] = useState<RequestState>({ loading: true });
    const [balanceState, setBalanceState] = useState<RequestState>({ loading: true });
    const [approvalState, setApprovalState] = useState<ApprovalState>({});

    // Load onchain data
    const loadData = async () => {
        if (allowanceState.loading) {
            const values = await Promise.all([tokenContract.allowance(account, metadata.vaultAddress), tokenContract.balanceOf(account)]);
            setAllowanceState({ response: values[0], loading: false });
            setBalanceState({ response: values[1], loading: false });
        }
    };

    // This will be executed when component is mounted or updated
    useEffect(() => {
        loadData();
    });

    // UI States
    const showLoading = allowanceState.loading ? true : false;
    const showError = !showLoading && allowanceState.error ? true : false;
    const showApprovalOrWithdraw = !showLoading && !showError && allowanceState.response ? true : false;
    const showApproval = showApprovalOrWithdraw && allowanceState.response && balanceState.response && !allowanceState.response.gt(balanceState.response) && !approvalState.approved ? true : false;
    const showWithdraw = !showApproval || approvalState.approved ? true : false;

    return (
        <div>
            {showLoading && <FormLoading />}
            {showError && <FormLoadingFailed />}
            {showApprovalOrWithdraw && (
                <div>
                    {showApproval && (
                        <div className="flex flex-col">
                            <div className="py-4 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed">
                                <p className="text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Allow Risedle to use your {metadata.vaultTitle}</p>
                            </div>
                            <div className="pt-4">
                                {!approvalState.approving && (
                                    <ButtonPositive
                                        full
                                        onClick={async () => {
                                            setApprovalState({ approving: true });
                                            try {
                                                if (!signerData.data) return setApprovalState({ approving: false });
                                                const connectedContract = tokenContract.connect(signerData.data);
                                                const result = await connectedContract.approve(metadata.vaultAddress, ethers.constants.MaxUint256);
                                                console.debug("Withdraw: approve result", result);
                                                setApprovalState({ approving: true, hash: result.hash });
                                                toast.remove();
                                                toast.custom((t) => <ToastInProgress>Approving {metadata.vaultTitle}</ToastInProgress>, { duration: 10000 });
                                                await result.wait();
                                                toast.remove();
                                                toast.custom((t) => <ToastSuccess>{metadata.vaultTitle} approved</ToastSuccess>);
                                                setApprovalState({ approving: false, hash: result.hash, approved: true });
                                                setAllowanceState({ loading: true });
                                                console.debug("Withdraw: approve success");
                                            } catch (e) {
                                                console.error(e);
                                                const error = e as Error;
                                                setApprovalState({ approving: false, error });
                                                toast.remove();
                                                toast.custom((t) => <ToastError>Approving failed</ToastError>);
                                                console.debug("Withdraw: approve failed");
                                            }
                                        }}
                                    >
                                        Approve
                                    </ButtonPositive>
                                )}
                                {approvalState.approving && <ButtonLoading full>Approving...</ButtonLoading>}
                            </div>
                            {approvalState.hash && (
                                <div className="pt-4 text-center">
                                    <Link href={getExplorerLink(chain, approvalState.hash)}>
                                        <a target="_blank" rel="noreferrer" className="text-sm py-4 text-gray-text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            <span className="hover:underline">Goto transaction</span> &#8599;
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
