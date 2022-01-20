import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Import the useDapp
import {
    useTokenAllowance,
    getExplorerTransactionLink,
    useTokenBalance,
} from "@usedapp/core";
import { utils, constants, BigNumber } from "ethers";

// Import wagmi
import {
    useAccount,
    useContractWrite,
    useWaitForTransaction,
    useContractEvent,
    chain
} from 'wagmi'

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ExchangeFormNotApproved from "../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../components/TransactionInProgress";
import TransactionIsCompleted from "../../components/TransactionIsCompleted";

// Contract interface
import RisedleMarket from "../../abis/RisedleMarket";
import ERC20 from "../../abis/ERC20";

const VaultDeposit: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Setup hooks
    const router = useRouter();
    const [{data: accountData}, disconnect] = useAccount();
    console.debug("Risedle: account", accountData?.address);

    // Check if account is connected, if no user will be redirected to /connect
    useEffect(() => {
        if (!accountData?.address) {
            router.push('/connect');
        }
    }, [accountData])

    // Check USDC allowance
    const allowance = useTokenAllowance(
        ERC20.usdc,
        accountData?.address,
        RisedleMarket.address
    );
    console.debug("Risedle: USDC Address", ERC20.usdc);
    console.debug("Risedle: USDC Allowance", allowance);

    // Get USDC balance
    let usdcBalance = "0";
    const usdcBalanceBigNum = useTokenBalance(ERC20.usdc, accountData?.address);
    if (usdcBalanceBigNum) {
        usdcBalance = utils.formatUnits(usdcBalanceBigNum, 6);
        // Rounding down
        usdcBalance = (Math.floor(parseFloat(usdcBalance) * 100) / 100).toFixed(
            2
        );
    }
    console.debug("Risedle: USDC Balance", usdcBalance);

    // Create function to approve USDC
    const [usdcApprovalResult, writeUsdcApproval] = useContractWrite(
        {
            addressOrName: ERC20.usdc,
            contractInterface: ERC20.interface,
        },
        'approve',
    )

    // Setup usdc approval transaction wait
    const [ waitUsdcApprovalResult, waitUsdcApprovalFunc] = useWaitForTransaction({
        wait: usdcApprovalResult.data?.wait
    })

    // Setup states for the approval
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get approval transaction link
    let usdcApprovalTransactionLink = "";
    if (usdcApprovalResult.data?.hash) {
        const transactionHash = usdcApprovalResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            usdcApprovalTransactionLink = link;
        }
    }

    // Create function to deposit USDC
    const [usdcDepositResult, writeUsdcDeposit] = useContractWrite(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface,
        },
        'addSupply',
    )

    // Setup usdc approval transaction wait
    const [ waitUsdcDepositResult, waitUsdcDepositFunc] = useWaitForTransaction({
        wait: usdcDepositResult.data?.wait
    })

    // Setup states for the deposit process
    let [isDepositCompleted, setIsDepositCompleted] = useState(false);
    let [depositAmount, setDepositAmount] = useState("0");

    // Get deposit transaction link
    let risedleDepositTransactionLink = "";
    if (usdcDepositResult.data?.hash) {
        const transactionHash = usdcDepositResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            risedleDepositTransactionLink = link;
        }
    }

    //get minted rvUSDC amount event
    const [mintedEvent, setMintedEvent] = useState([])
    useContractEvent(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'VaultSupplyAdded',
        (e) => setMintedEvent(e)
    )

    // If deposit success, get minted amount
    // TODO(bayu): Handle error
    let mintedAmount = "0";
    if (mintedEvent[3]) {
        const mintedAmountBigNumber = mintedEvent[3];
        mintedAmount = utils.formatUnits(mintedAmountBigNumber, 6);
    }

    const mainDisplay = (
        allowance: BigNumber | undefined
    ) => {
        // If approval in progress, display the spinner
        if (waitUsdcApprovalResult.loading) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title="Approving ..."
                        subTitle="It may take a few minutes"
                        transactionLink={usdcApprovalTransactionLink}
                    />
                </div>
            );
        }

        // If approval is completed, display completed transaction in 2s
        if (waitUsdcApprovalResult.data && isApprovalCompleted) {
            const onClose = () => {
                setIsApprovalCompleted(false);
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Approval completed"
                        subTitle="Now you can continue to deposit"
                        transactionLink={usdcApprovalTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (waitUsdcDepositResult.loading) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Depositing ${depositAmount} USDC`}
                        subTitle="It may take a few minutes"
                        transactionLink={risedleDepositTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if ( waitUsdcDepositResult.data && isDepositCompleted) {
            const onClose = () => {
                setIsDepositCompleted(false);
                setMintedEvent([]);
                mintedAmount="0";
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Deposit completed"
                        subTitle={`You have received ${mintedAmount} rvUSDC`}
                        transactionLink={risedleDepositTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If there is no allowance, then allow send approve transaction first
        if (allowance) {
            // If allowance is less than 1 million, run the approval again, just in case
            if (allowance <= BigNumber.from(1e6 * 1e6)) {
                return (
                    <div className="mt-16">
                        <ExchangeFormNotApproved
                            backTitle="← Go back to vault"
                            backURL="/vault"
                            title="Deposit USDC"
                            subTitle="Earn variable interest rate instantly."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="USDC"
                            formInputTokenBalance={usdcBalance}
                            formOutputToken="rvUSDC"
                            onClickApprove={async () => {
                                // Send the tx
                                await writeUsdcApproval(
                                    {
                                        args: [RisedleMarket.address, constants.MaxUint256]
                                    }
                                );

                                // Display the completed
                                setIsApprovalCompleted(true);
                            }}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="mt-16">
                        <ExchangeFormApproved
                            backTitle="← Go back to vault"
                            backURL="/vault"
                            title="Deposit USDC"
                            subTitle="Earn variable interest rate instantly."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="USDC"
                            formInputTokenBalance={usdcBalance}
                            formOutputToken="rvUSDC"
                            formSubmitTitle="Deposit"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setDepositAmount(amount);

                                // Parse units
                                const depositAmount = utils.parseUnits(
                                    amount,
                                    6
                                );

                                // Send tx
                                await writeUsdcDeposit(
                                    {
                                        args: depositAmount,
                                    }
                                );

                                // Display the receipt
                                setIsDepositCompleted(true);
                            }}
                        />
                    </div>
                );
            }
        }

        // TODO (bayu): If we reach here, there is something wrong.
        // Display error here
    };

    return (
        <div>
            <Head>
                <title>Deposit USDC | Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation
                activeMenu="vault"
            />
            {mainDisplay(allowance)}
        </div>
    );
};

export default VaultDeposit;