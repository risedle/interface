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
    useContractWrite, 
    useWaitForTransaction,
    useContractEvent,
    useAccount,
    chain 
} from "wagmi";

// Import components
import Favicon from "../../../components/Favicon";
import Navigation from "../../../components/Navigation";
import ExchangeFormNotApproved from "../../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../../components/TransactionInProgress";
import TransactionIsCompleted from "../../../components/TransactionIsCompleted";

// Contract interface
import RisedleMarket from "../../../abis/RisedleMarket";
import ERC20 from "../../../abis/ERC20";

const RedeemETHRISE: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Setup hooks
    const [{data: accountData}, disconnect] = useAccount();
    const router = useRouter();
    console.debug("Risedle: account", accountData?.address);

    // Check if account is connected, if no user will be redirected to /connect
    useEffect(() => {
        if (!accountData?.address) {
            router.push('/connect');
        }
    }, [accountData])

    // Check ETHRISE allowance
    const allowance = useTokenAllowance(
        RisedleMarket.ethrise,
        accountData?.address,
        RisedleMarket.address
    );
    console.debug("Risedle: allowance", allowance);

    // Get ETHRISE balance
    let ethriseBalance = "0";
    const ethriseBalanceBigNum = useTokenBalance(
        RisedleMarket.ethrise,
        accountData?.address
    );
    if (ethriseBalanceBigNum) {
        ethriseBalance = utils.formatUnits(ethriseBalanceBigNum, 18);
        // Rounding down
        ethriseBalance = (
            Math.floor(parseFloat(ethriseBalance) * 100) / 100
        ).toFixed(2);
    }

    // Create function to approve ETHRISE
    const [ETHRISEApprovalResult, writeETHRISEApproval] = useContractWrite(
        {
            addressOrName: RisedleMarket.ethrise,
            contractInterface: ERC20.interface,
        },
        'approve',
    )

    // Setup ETHRISE approval transaction wait
    const [ waitWethApprovalResult, waitWethApprovalFunc] = useWaitForTransaction({
        wait: ETHRISEApprovalResult.data?.wait
    })
    
    // Setup completed state for ETHRISE approval
    const [isApprovalCompleted, setIsApprovalCompleted] = useState(false)

    // Get the ETHRISE approval transaction link
    let approvalTransactionLink = "";
    if (ETHRISEApprovalResult.data?.hash) {
        const transactionHash = ETHRISEApprovalResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Create function to redeem ETHRISE
    const [ETHRISERedeemResult, writeETHRISERedeem] = useContractWrite(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'redeem',
    )

    // Setup ETHRISE redeem transaction wait
    const [ waitETHRISERedeemResult, waitETHRISERedeemFunc] = useWaitForTransaction({
        wait: ETHRISERedeemResult.data?.wait
    })

    // Setup states for mint process
    let [isRedeemCompleted, setIsRedeemCompleted] = useState(false);
    let [burnedETHRISEAmount, setBurnedETHRISEAmount] = useState("0");

    // Get redeem transaction link
    let mintTransactionLink = "";
    if (ETHRISERedeemResult.data?.hash) {
        const transactionHash = ETHRISERedeemResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            mintTransactionLink = link;
        }
    }

    //get redeemed ETHRISE amount event
    const [redeemedEvent, setRedeemedEvent] = useState([])
    useContractEvent(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'ETFBurned',
        (e) => setRedeemedEvent(e)
    )

    // Get redeem amount
    let redeemedAmount = "0";
    if (redeemedEvent[2]) {
        // Get the SupplyAdded event
        const redeemedAmountBigNumber = redeemedEvent[2];
        redeemedAmount = utils.formatUnits(redeemedAmountBigNumber, 18);
    }

    const mainDisplay = (
        allowance: BigNumber | undefined
    ) => {
        // If approval in progress, display the spinner
        if (waitWethApprovalResult.loading) {
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
        if (waitWethApprovalResult.data && isApprovalCompleted) {
            const onClose = () => {
                setIsApprovalCompleted(false);
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Approval completed"
                        subTitle="Now you can continue to mint"
                        transactionLink={approvalTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (waitETHRISERedeemResult.loading) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Redeeming ${burnedETHRISEAmount} ETHRISE`}
                        subTitle="It may take a few minutes"
                        transactionLink={mintTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (waitETHRISERedeemResult.data && isRedeemCompleted) {
            const onClose = () => {
                setIsRedeemCompleted(false);
                setRedeemedEvent([]);
                redeemedAmount="0";
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Redeem completed"
                        subTitle={`You have received ${redeemedAmount} WETH`}
                        transactionLink={mintTransactionLink}
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
                            backTitle="← Go back to ETHRISE"
                            backURL="/products/ethrise"
                            title="Redeem ETHRISE"
                            subTitle="Burn ETHRISE to receive WETH in exchange."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="ETHRISE"
                            formInputTokenBalance={ethriseBalance}
                            formOutputToken="WETH"
                            onClickApprove={async () => {
                                // Send the tx
                                await writeETHRISEApproval(
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
                            backTitle="← Go back to ETHRISE"
                            backURL="/products/ethrise"
                            title="Redeem ETHRISE"
                            subTitle="Burn ETHRISE to receive WETH in exchange."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="ETHRISE"
                            formInputTokenBalance={ethriseBalance}
                            formOutputToken="WETH"
                            formSubmitTitle="Redeem"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setBurnedETHRISEAmount(amount);
                                console.debug("Risedle: weth amount", amount);

                                // Parse units
                                const redeemAmount = utils.parseUnits(
                                    amount,
                                    18
                                );
                                console.debug(
                                    "Risedle: redeemAmount",
                                    redeemAmount
                                );

                                // TODO: Handle error transaction
                                console.debug(
                                    "Risedle: ETHRISE Address",
                                    RisedleMarket.ethrise
                                );
                                await writeETHRISERedeem(
                                    {
                                        args: [RisedleMarket.ethrise, redeemAmount]
                                    }
                                );
                                console.debug(
                                    "Risedle: risedleRedeem",
                                    ETHRISERedeemResult.data
                                );
                                console.debug("Risedle: WHYY?");

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
                <title>Redeem ETHRISE | Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation
                activeMenu="products"
            />
            {mainDisplay(allowance)}
        </div>
    );
};

export default RedeemETHRISE;