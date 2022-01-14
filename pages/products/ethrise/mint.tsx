import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

// Import the useDapp
import {
    useContractCalls,
    useEthers,
    useTokenAllowance,
    useContractFunction,
    getExplorerTransactionLink,
    ChainId,
    useTokenBalance,
} from "@usedapp/core";
import { utils, constants, BigNumber, Contract } from "ethers";

// Import components
import Favicon from "../../../components/Favicon";
import Navigation from "../../../components/Navigation";
import ConnectWalletPrompt from "../../../components/ConnectWalletPrompt";
import ExchangeFormNotApproved from "../../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../../components/TransactionInProgress";
import TransactionIsCompleted from "../../../components/TransactionIsCompleted";

// Contract interface
import RisedleMarket from "../../../abis/RisedleMarket";
import ERC20 from "../../../abis/ERC20";

const MintETHRISE: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Setup hooks
    const { activateBrowserWallet, account, deactivate } = useEthers();
    console.debug("Risedle: account", account);

    // Check WETH allowance
    const allowance = useTokenAllowance(
        ERC20.weth,
        account,
        RisedleMarket.address
    );
    console.debug("Risedle: allowance", allowance);

    // Get WETH balance
    let wethBalance = "0";
    const wethBalanceBigNum = useTokenBalance(ERC20.weth, account);
    if (wethBalanceBigNum) {
        wethBalance = utils.formatUnits(wethBalanceBigNum, 18);
        // Rounding down
        wethBalance = (Math.floor(parseFloat(wethBalance) * 100) / 100).toFixed(
            2
        );
    }

    // Create the WETH contract and function that we use
    const wethContract = new Contract(ERC20.weth, ERC20.interface);
    const wethApproval = useContractFunction(wethContract, "approve", {
        transactionName: "Approve",
    });
    console.debug("Risedle: ERC20.weth", ERC20.weth);

    // Setup states for approval
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get the approval transaction link
    let approvalTransactionLink = "";
    if (wethApproval.state.transaction?.hash) {
        const transactionHash = wethApproval.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Create the Risedle contract and function that we use
    const risedleContract = new Contract(
        RisedleMarket.address,
        RisedleMarket.interface
    );
    const risedleETHRISEMint = useContractFunction(risedleContract, "invest", {
        transactionName: "Invest",
    });
    console.debug("Risedle: RisedleMarket.address", RisedleMarket.address);

    // Setup states for mint process
    let [isMintInProgress, setIsMintInProgress] = useState(false);
    let [isMintCompleted, setIsMintCompleted] = useState(false);
    let [mintWETHAmount, setMintWETHAmount] = useState("0");

    // Get mint transaction link
    let mintTransactionLink = "";
    if (risedleETHRISEMint.state.transaction?.hash) {
        const transactionHash = risedleETHRISEMint.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            mintTransactionLink = link;
        }
    }

    // Get minted amount
    let mintedAmount = "0";
    if (risedleETHRISEMint.events) {
        // Get the SupplyAdded event
        const event = risedleETHRISEMint.events.filter(
            (log) => log.name == "ETFMinted"
        );
        const mintedAmountBigNumber = event[0].args.amount;
        mintedAmount = utils.formatUnits(mintedAmountBigNumber, 18);
    }

    const mainDisplay = (
        account: string | null | undefined,
        allowance: BigNumber | undefined
    ) => {
        if (!account) {
            return (
                <div className="mt-16">
                    <ConnectWalletPrompt
                        activateBrowserWallet={activateBrowserWallet}
                    />
                </div>
            );
        }

        // If approval in progress, display the spinner
        if (isApprovalInProgress) {
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
        if (isApprovalCompleted) {
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
        if (isMintInProgress) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Converting ${mintWETHAmount} WETH to ETHRISE`}
                        subTitle="It may take a few minutes"
                        transactionLink={mintTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (isMintCompleted) {
            const onClose = () => {
                setIsMintCompleted(false);
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Mint completed"
                        subTitle={`You have received ${mintedAmount} ETHRISE`}
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
                            backURL="/invest/ethrise"
                            title="Mint ETHRISE"
                            subTitle="Deposit WETH and receive ETHRISE in exchange."
                            formTitle="Mint amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="WETH"
                            formInputTokenBalance={wethBalance}
                            formOutputToken="ETHRISE"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await wethApproval.send(
                                    RisedleMarket.address,
                                    constants.MaxUint256
                                );

                                // Turn of spinner
                                setIsApprovalInProgress(false);

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
                            backURL="/invest/ethrise"
                            title="Mint ETHRISE"
                            subTitle="Deposit WETH and receive ETHRISE in exchange."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="WETH"
                            formInputTokenBalance={wethBalance}
                            formOutputToken="ETHRISE"
                            formSubmitTitle="Mint"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setMintWETHAmount(amount);
                                console.debug("Risedle: weth amount", amount);

                                // Show the spinner
                                setIsMintInProgress(true);

                                // Parse units
                                const depositAmount = utils.parseUnits(
                                    amount,
                                    18
                                );
                                console.debug(
                                    "Risedle: depositAmount",
                                    depositAmount
                                );

                                // TODO: Handle error transaction
                                console.debug(
                                    "Risedle: ETHRISE Address",
                                    RisedleMarket.ethrise
                                );
                                await risedleETHRISEMint.send(
                                    RisedleMarket.ethrise,
                                    depositAmount
                                );
                                console.debug(
                                    "Risedle: risedleETHRISEMint",
                                    risedleETHRISEMint
                                );
                                console.debug("Risedle: WHYY?");

                                // Turn of the spinner
                                setIsMintInProgress(false);

                                // Display the receipt
                                setIsMintCompleted(true);
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
                <title>Mint ETHRISE | Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation />
            {mainDisplay(account, allowance)}
        </div>
    );
};

export default MintETHRISE;
