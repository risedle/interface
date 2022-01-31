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
import DepositForm from "./DepositForm";
import ToastInProgress from "../Toasts/InProgress";

/**
 * DepositProps is a React Component properties that passed to React Component Deposit
 */
type DepositProps = {
    address: string;
};

/**
 * Deposit is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Deposit: FunctionComponent<DepositProps> = ({ address }) => {
    // Global states
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const [signerData] = useSigner();

    // Initialize contracts
    const tokenContract = new ethers.Contract(metadata.debtAddress, erc20ABI, provider);

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
    const showLoading = allowanceState.loading || signerData.loading ? true : false;
    const showError = !showLoading && allowanceState.error && signerData.error ? true : false;
    const showApprovalOrDeposit = !showLoading && !showError && allowanceState.response ? true : false;
    const showApproval = showApprovalOrDeposit && allowanceState.response && balanceState.response && signerData.data && !allowanceState.response.gt(balanceState.response) && !approvalState.approved ? true : false;
    const showDeposit = !showApproval || approvalState.approved ? true : false;

    return (
        <div>
            {showLoading && <FormLoading />}
            {showError && <FormLoadingFailed />}
            {showApprovalOrDeposit && (
                <div>
                    {showApproval && (
                        <div className="flex flex-col">
                            <div className="border-b border-dashed border-gray-light-5 py-4 dark:border-gray-dark-5">
                                <p className="text-center text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Allow Risedle to use your {metadata.debtSymbol}</p>
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
                                                setApprovalState({ approving: true, hash: result.hash });
                                                toast.remove();
                                                toast.custom((t) => <ToastInProgress>Approving {metadata.debtSymbol}</ToastInProgress>);
                                                await result.wait();
                                                toast.remove();
                                                toast.custom((t) => <ToastSuccess>{metadata.debtSymbol} approved</ToastSuccess>);
                                                setApprovalState({ approving: false, hash: result.hash, approved: true });
                                                setAllowanceState({ loading: true }); // Reload component
                                            } catch (e) {
                                                console.error(e);
                                                const error = e as Error;
                                                setApprovalState({ approving: false, error });
                                                toast.remove();
                                                toast.custom((t) => <ToastError>Approving failed</ToastError>);
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
                                        <a target="_blank" rel="noreferrer" className="text-gray-text-center py-4 text-sm text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            <span className="hover:underline">Goto transaction</span> &#8599;
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {showDeposit && <DepositForm address={address} />}
                </div>
            )}
        </div>
    );
};

export default Deposit;
