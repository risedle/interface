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
import RedeemForm from "./RedeemForm";

import { RequestState, ApprovalState } from "./States";
import VaultABI from "./VaultABI";
import { getExplorerLink } from "./Explorer";
import OracleABI from "./OracleABI";
import ToastInProgress from "../Toasts/InProgress";

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
    const { account, chain } = useWalletContext();
    const metadata = Metadata[chain.id][address];
    const provider = useProvider();
    const [signerData] = useSigner();

    // Initialize contracts
    const leveragedTokenContract = new ethers.Contract(address, erc20ABI, provider);
    const vaultContract = new ethers.Contract(metadata.vaultAddress, VaultABI, provider);
    const oracleContract = new ethers.Contract(metadata.oracleAddress, OracleABI, provider);

    // States
    const [allowanceState, setAllowanceState] = useState<RequestState>({ loading: true });
    const [navState, setNAVState] = useState<RequestState>({ loading: true });
    const [collateralPriceState, setCollateralPriceState] = useState<RequestState>({ loading: true });
    const [approval, setApproval] = useState<ApprovalState>({});

    // Load onchain data
    const loadData = async () => {
        if (allowanceState.loading && navState.loading && collateralPriceState.loading) {
            const values = await Promise.all([leveragedTokenContract.allowance(account, metadata.vaultAddress), leveragedTokenContract.balanceOf(account), vaultContract.getNAV(address), oracleContract.getPrice()]);
            setAllowanceState({ response: values[0], loading: false });
            setNAVState({ response: values[2], loading: false });
            setCollateralPriceState({ response: values[3], loading: false });
        }
    };

    // This will be executed when component is mounted or updated
    useEffect(() => {
        loadData();
    });

    // UI States
    const showLoading = allowanceState.loading || navState.loading || collateralPriceState.loading || signerData.loading ? true : false;
    const showError = !showLoading && (allowanceState.error || navState.error || collateralPriceState.error || signerData.error) ? true : false;
    const showApprovalOrRedeem = !showLoading && !showError && allowanceState.response && navState.response && collateralPriceState.response && signerData.data ? true : false;
    const showApproval = showApprovalOrRedeem && allowanceState.response && !allowanceState.response.eq(ethers.constants.MaxUint256) && !approval.approved ? true : false;
    const showRedeem = !showApproval || approval.approved ? true : false;

    // Data
    const nav = parseFloat(ethers.utils.formatUnits(navState.response ? navState.response : 0, metadata.debtDecimals));
    const collateralPrice = parseFloat(ethers.utils.formatUnits(collateralPriceState.response ? collateralPriceState.response : 0, metadata.debtDecimals));

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
                                {!approval.approving && (
                                    <ButtonPositive
                                        full
                                        onClick={async () => {
                                            setApproval({ approving: true });
                                            try {
                                                if (!signerData.data) return setApproval({ approving: false });
                                                const connectedContract = leveragedTokenContract.connect(signerData.data);
                                                const result = await connectedContract.approve(metadata.vaultAddress, ethers.constants.MaxUint256);
                                                setApproval({ approving: true, hash: result.hash });
                                                toast.custom((t) => <ToastInProgress>Approving {metadata.title}</ToastInProgress>);
                                                await result.wait();
                                                toast.remove();
                                                toast.custom((t) => <ToastSuccess>{metadata.title} approved</ToastSuccess>);
                                                setApproval({ approving: false, hash: result.hash, approved: true });
                                                setAllowanceState({ loading: true });
                                                setCollateralPriceState({ loading: true });
                                                setNAVState({ loading: true });
                                            } catch (e) {
                                                console.error(e);
                                                const error = e as Error;
                                                setApproval({ approving: false, error });
                                                toast.custom((t) => <ToastError>Approving failed</ToastError>);
                                            }
                                        }}
                                    >
                                        Approve
                                    </ButtonPositive>
                                )}
                                {approval.approving && <ButtonLoading full>Approving...</ButtonLoading>}
                            </div>
                            {approval.hash && (
                                <div className="pt-4 text-center">
                                    <Link href={getExplorerLink(chain, approval.hash)}>
                                        <a target="_blank" rel="noreferrer" className="text-gray-text-center py-4 text-sm text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            <span className="hover:underline">Goto transaction</span> &#8599;
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {showRedeem && <RedeemForm address={address} nav={nav} collateralPrice={collateralPrice} />}
                </div>
            )}
        </div>
    );
};

export default Redeem;
