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
} from "@usedapp/core";
import { utils, constants, BigNumber, Contract } from "ethers";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";
import ExchangeFormNotApproved from "../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../components/TransactionInProgress";
import TransactionIsCompleted from "../../components/TransactionIsCompleted";

// Contract interface
import RisedleVault from "../../abis/RisedleVault";

const vaultUnderlyingTokenContractInterface = new utils.Interface([
    // Read
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",

    // Write
    "function approve(address spender, uint256 amount) external",

    // Events
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
]);
const vaultUnderlyingTokenContractAddress =
    "0x64249d73AF4C3ABC7A9704Bf02188fa36d0B1Ed9";

const LendWithdraw: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance of vault token
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Read data from chain
    const results = useContractCalls([
        {
            abi: RisedleVault.interface,
            address: RisedleVault.address,
            method: "decimals",
            args: [],
        },
        {
            abi: RisedleVault.interface,
            address: RisedleVault.address,
            method: "symbol",
            args: [],
        },
    ]);
    const [tokenDecimalResult, tokenSymbolResult] = results;
    // TODO(bayu): Handle when the token decimal is not exists
    let underlyingTokenDecimal = 18;
    if (tokenDecimalResult) {
        underlyingTokenDecimal = tokenDecimalResult[0];
    }
    let underlyingTokenSymbol = "USDC";
    if (tokenSymbolResult) {
        underlyingTokenSymbol = tokenSymbolResult[0];
    }
    console.log("DEBBUG: tokenDecimalResult", tokenDecimalResult);
    console.log("DEBBUG: tokenSymbolResult", tokenSymbolResult);

    // Setup hooks
    const { activateBrowserWallet, account, deactivate } = useEthers();

    // Check the allowance of vault token
    const allowance = useTokenAllowance(
        RisedleVault.address,
        account,
        RisedleVault.address
    );

    // Create the vault contract object
    const vaultContract = new Contract(
        RisedleVault.address,
        RisedleVault.interface
    );

    // Approval function
    const approval = useContractFunction(vaultContract, "approve", {
        transactionName: "Approve",
    });

    // Main actions
    const redeem = useContractFunction(vaultContract, "burn", {
        transactionName: "Burn",
    });

    // Setup states
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);
    let [isRedeemInProgress, setIsRedeemInProgress] = useState(false);
    let [isRedeemCompleted, setIsRedeemCompleted] = useState(false);
    let [redeemAmount, setRedeemAmount] = useState("0");

    // Get approval transaction link
    let approvalTransactionLink = "";
    if (approval.state.transaction?.hash) {
        const transactionHash = approval.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Get redeem transaction link
    let redeemTransactionLink = "";
    if (redeem.state.transaction?.hash) {
        const transactionHash = redeem.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            redeemTransactionLink = link;
        }
    }

    // Get minted amount
    let redeemedAmount = "0";
    if (redeem.events) {
        // Get the SupplyAdded event
        const event = redeem.events.filter(
            (log) => log.name == "SupplyRemoved"
        );
        const redeemedAmountBigNumber = event[0].args.redeemedAmount;
        redeemedAmount = utils.formatUnits(
            redeemedAmountBigNumber,
            underlyingTokenDecimal
        );
    }

    const mainDisplay = (
        account: string | null | undefined,
        allowance: BigNumber | undefined
    ) => {
        // If there is no account connected then display the prompt
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
            // Turn of after 2s
            setTimeout(function () {
                setIsApprovalCompleted(false);
            }, 2 * 1000); // 2s

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Approval completed"
                        subTitle="Redirecting ..."
                        transactionLink={approvalTransactionLink}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (isRedeemInProgress) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Redeeming ${redeemAmount} ${underlyingTokenSymbol}`}
                        subTitle="It may take a few minutes"
                        transactionLink={approvalTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (isRedeemCompleted) {
            // TODO (bayu): Get the minted amount
            // Turn of after 20s
            setTimeout(function () {
                setIsRedeemCompleted(false);
            }, 20 * 1000); // 20s

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Withdrawal completed"
                        subTitle={`You have received ${redeemedAmount} USDC`}
                        transactionLink={redeemTransactionLink}
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
                            backTitle="← Go back to lend"
                            backURL="/lend"
                            title="Redeem rvUSDC"
                            subTitle="Burn rvUSDC to receive USDC."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="rvUSDC"
                            formOutputToken="USDC"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await approval.send(
                                    RisedleVault.address,
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
                            backTitle="← Go back to lend"
                            backURL="/lend"
                            title="Redeem rvUSDC"
                            subTitle="Burn rvUSDC to receive USDC."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="rvUSDC"
                            formOutputToken="USDC"
                            formSubmitTitle="Redeem"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setRedeemAmount(amount);

                                // Show the spinner
                                setIsRedeemInProgress(true);

                                // Parse units
                                const redeemAmountParsed = utils.parseUnits(
                                    amount,
                                    underlyingTokenDecimal
                                );

                                // Send tx

                                console.log("========== amount", amount);
                                console.log(
                                    "========== redeemAmountParsed",
                                    redeemAmountParsed
                                );
                                await redeem.send(redeemAmountParsed);

                                console.log("========== DEBUG HELLO");

                                // Turn of the spinner
                                setIsRedeemInProgress(false);

                                // Display the receipt
                                setIsRedeemCompleted(true);
                            }}
                        />
                    </div>
                );
            }
        }

        // return <p className="text-white">HELLO</p>;
    };

    console.log("DEBUG: deposit page end return");

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
                account={account}
                activateBrowserWallet={activateBrowserWallet}
                deactivate={deactivate}
            />
            {mainDisplay(account, allowance)}
        </div>
    );
};

export default LendWithdraw;
