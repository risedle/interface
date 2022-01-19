import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Import the useDapp
import {
    useTokenAllowance,
    useContractFunction,
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
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";
import ExchangeFormNotApproved from "../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../components/TransactionInProgress";
import TransactionIsCompleted from "../../components/TransactionIsCompleted";

// Contract interface
import RisedleMarket from "../../abis/RisedleMarket";

const VaultWithdraw: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance of vault token
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

    // Check vault token allowance
    const allowance = useTokenAllowance(
        RisedleMarket.address,
        accountData?.address,
        RisedleMarket.address
    );
    console.debug("Risedle: rvUSDC Address", RisedleMarket.address);
    console.debug("Risedle: rvUSDC Allowance", allowance);

    // Get rvUSDC balance
    let rvUSDCBalance = "0";
    const rvUSDCBalanceBigNum = useTokenBalance(RisedleMarket.address, accountData?.address);
    if (rvUSDCBalanceBigNum) {
        rvUSDCBalance = utils.formatUnits(rvUSDCBalanceBigNum, 6);
        // Rounding down
        rvUSDCBalance = (
            Math.floor(parseFloat(rvUSDCBalance) * 100) / 100
        ).toFixed(2);
    }
    console.debug("Risedle: USDC Balance", rvUSDCBalance);

    // Create function to approve Vault Token
    const [rvTokenApprovalResult, writeRvTokenApproval] = useContractWrite(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface,
        },
        'approve',
    )

    // Setup Vault Token approval transaction wait
    const [ waitRvTokenApprovalResult, waitRvTokenApprovalFunc] = useWaitForTransaction({
        wait: rvTokenApprovalResult.data?.wait
    })

    // Setup states for vault token approval
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get approval transaction link
    let approvalTransactionLink = "";
    if (rvTokenApprovalResult.data?.hash) {
        const transactionHash = rvTokenApprovalResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Create function to redeem USDC
    const [risedleRedeemUsdcResult, writeRisedleRedeemUsdc] = useContractWrite(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface,
        },
        'removeSupply',
    )

    // Setup redeem USDC transaction wait
    const [waitRisedleRedeemUsdcResult, waitRisedleRedeemUsdcFunc] = useWaitForTransaction({
        wait: risedleRedeemUsdcResult.data?.wait
    })

    // Setup states for redeem process
    let [isRedeemCompleted, setIsRedeemCompleted] = useState(false);
    let [redeemAmount, setRedeemAmount] = useState("0");

    // Get redeem transaction link
    let redeemTransactionLink = "";
    if (risedleRedeemUsdcResult.data?.hash) {
        const transactionHash = risedleRedeemUsdcResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            redeemTransactionLink = link;
        }
    }

    //get redeemed rvUSDC amount event
    const [redeemedEvent, setRedeemedEvent] = useState([])
    useContractEvent(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'VaultSupplyRemoved',
        (e) => setRedeemedEvent(e)
    )

    // Get redeemed amount
    let redeemedAmount = "0";
    if (redeemedEvent[3]) {
        const redeemedAmountBigNumber = redeemedEvent[3];
        redeemedAmount = utils.formatUnits(redeemedAmountBigNumber, 6);
    }

    const mainDisplay = (
        allowance: BigNumber | undefined,
    ) => {
        // If approval in progress, display the spinner
        if (waitRvTokenApprovalResult.loading) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title="Approving ..."
                        subTitle="It may take a few minutes"
                        transactionLink={approvalTransactionLink}
                    />
                </div>
            );
        }

        // If approval is completed, display completed transaction in 2s
        if (waitRvTokenApprovalResult.data && isApprovalCompleted) {
            const onClose = () => {
                setIsApprovalCompleted(false);
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Approval completed"
                        subTitle="Now you can continue to withdraw"
                        transactionLink={approvalTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (waitRisedleRedeemUsdcResult.loading) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Redeeming ${redeemAmount} rvUSDC`}
                        subTitle="It may take a few minutes"
                        transactionLink={approvalTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (waitRisedleRedeemUsdcResult.data && isRedeemCompleted) {
            const onClose = () => {
                setIsRedeemCompleted(false);
                setRedeemedEvent([]);
                redeemedAmount="0";
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Withdrawal completed"
                        subTitle={`You have received ${redeemedAmount} USDC`}
                        transactionLink={redeemTransactionLink}
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
                            title="Withdraw USDC"
                            subTitle="Burn rvUSDC to receive USDC."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="rvUSDC"
                            formInputTokenBalance={rvUSDCBalance}
                            formOutputToken="USDC"
                            onClickApprove={async () => {
                                // Send the tx
                                await writeRvTokenApproval(
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
                            title="Withdraw USDC"
                            subTitle="Burn rvUSDC to receive USDC."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="rvUSDC"
                            formInputTokenBalance={rvUSDCBalance}
                            formOutputToken="USDC"
                            formSubmitTitle="Redeem"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setRedeemAmount(amount);

                                // Parse units
                                const redeemAmountParsed = utils.parseUnits(
                                    amount,
                                    6
                                );

                                // Send tx
                                await writeRisedleRedeemUsdc(
                                    {
                                        args: redeemAmountParsed
                                    }
                                );

                                // Display the receipt
                                setIsRedeemCompleted(true);
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
                <title>Withdraw USDC | Risedle Protocol</title>
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

export default VaultWithdraw;