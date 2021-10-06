import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

// Import the useDapp
import {
    useContractCalls,
    useTokenBalance,
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
import DetailHeader from "../../components/DetailHeader";
import DetailCard from "../../components/DetailCard";
import ConnectWalletPrompt from "../../components/ConnectWalletPrompt";

// PNG files
import USDC_ICON from "../../public/USDC_ICON.png";
import ExchangeFormNotApproved from "../../components/ExchangeFormNotApproved";
import ExchangeFormApproved from "../../components/ExchangeFormAprroved";
import TransactionInProgress from "../../components/TransactionInProgress";
import TransactionIsCompleted from "../../components/TransactionIsCompleted";

// Contract interface
const vaultContractInterface = new utils.Interface([
    // Read only
    "function getSupplyRatePerSecondInEther() view returns (uint256)",
    "function totalOutstandingDebt() view returns (uint256)",
    "function getTotalAvailableCash() view returns (uint256)",
    "function getExchangeRateInEther() view returns (uint256)",

    // Write
    "function mint(uint256 amount) external",

    // Events
    "event InterestAccrued (uint256 previousTimestamp, uint256 currentTimestamp, uint256 previousTotalOutstandingDebt, uint256 previoustotalPendingFees, uint256 borrowRatePerSecondInEther, uint256 elapsedSeconds, uint256 interestAmount, uint256 totalOutstandingDebt, uint256 totalPendingFees)",
    "event SupplyAdded(address indexed account, uint256 amount, uint256 ExchangeRateInEther, uint256 mintedAmount)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
]);
const vaultUnderlyingTokenContractInterface = new utils.Interface([
    // Read
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",

    // Write
    "function approve(address spender, uint256 amount) external",

    // Events
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
]);
const vaultContractAddress = "0xECDC27a6214E3BC4715af5cB5706E03259e7A1f8";
const vaultUnderlyingTokenContractAddress =
    "0x64249d73AF4C3ABC7A9704Bf02188fa36d0B1Ed9";

const LendDeposit: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Read data from chain
    const results = useContractCalls([
        {
            abi: vaultUnderlyingTokenContractInterface,
            address: vaultUnderlyingTokenContractAddress,
            method: "decimals",
            args: [],
        },
        {
            abi: vaultUnderlyingTokenContractInterface,
            address: vaultUnderlyingTokenContractAddress,
            method: "symbol",
            args: [],
        },
    ]);
    const [underlyingTokenDecimalResult, underlyingTokenSymbolResult] = results;
    // TODO(bayu): Handle when the token decimal is not exists
    let underlyingTokenDecimal = 18;
    if (underlyingTokenDecimalResult) {
        underlyingTokenDecimal = underlyingTokenDecimalResult[0];
    }
    let underlyingTokenSymbol = "USDC";
    if (underlyingTokenSymbolResult) {
        underlyingTokenSymbol = underlyingTokenSymbolResult[0];
    }
    console.log(
        "DEBBUG: underlyingTokenDecimalResult",
        underlyingTokenDecimalResult
    );
    console.log(
        "DEBBUG: underlyingTokenSymbolResult",
        underlyingTokenSymbolResult
    );

    // Setup hooks
    const { activateBrowserWallet, active, account, deactivate } = useEthers();
    const allowance = useTokenAllowance(
        vaultUnderlyingTokenContractAddress,
        account,
        vaultContractAddress
    );
    const vaultUnderlyingTokenContract = new Contract(
        vaultUnderlyingTokenContractAddress,
        vaultUnderlyingTokenContractInterface
    );
    const vaultContract = new Contract(
        vaultContractAddress,
        vaultContractInterface
    );
    const approval = useContractFunction(
        vaultUnderlyingTokenContract,
        "approve",
        {
            transactionName: "Approve",
        }
    );
    const deposit = useContractFunction(vaultContract, "mint", {
        transactionName: "Mint",
    });

    // Setup states
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);
    let [isDepositInProgress, setIsDepositInProgress] = useState(false);
    let [isDepositCompleted, setIsDepositCompleted] = useState(false);
    let [depositAmount, setDepositAmount] = useState("0");

    // Get approval transaction link
    let approvalTransactionLink = "";
    if (approval.state.transaction?.hash) {
        const transactionHash = approval.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Get deposit transaction link
    let depositTransactionLink = "";
    if (deposit.state.transaction?.hash) {
        const transactionHash = deposit.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            depositTransactionLink = link;
        }
    }

    // Get minted amount
    let mintedAmount = "0";
    if (deposit.events) {
        // Get the SupplyAdded event
        const event = deposit.events.filter((log) => log.name == "SupplyAdded");
        const mintedAmountBigNumber = event[0].args.mintedAmount;
        mintedAmount = utils.formatUnits(
            mintedAmountBigNumber,
            underlyingTokenDecimal
        );
    }

    console.log("DEBUG: approval", approval);
    console.log("DEBUG: deposit", deposit);

    console.log("DEBUG: Allowance", allowance);

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
        if (isDepositInProgress) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Depositing ${depositAmount} ${underlyingTokenSymbol}`}
                        subTitle="It may take a few minutes"
                        transactionLink={approvalTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (isDepositCompleted) {
            // TODO (bayu): Get the minted amount
            // Turn of after 20s
            setTimeout(function () {
                setIsApprovalCompleted(false);
            }, 20 * 1000); // 20s

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Deposit completed"
                        subTitle={`You have received ${mintedAmount} rvUSDC`}
                        transactionLink={depositTransactionLink}
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
                            title="Deposit USDC"
                            subTitle="Earn variable interest rate instantly."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="USDC"
                            formOutputToken="rvUSDC"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await approval.send(
                                    vaultContractAddress,
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
                            title="Deposit USDC"
                            subTitle="Earn variable interest rate instantly."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="USDC"
                            formOutputToken="rvUSDC"
                            formSubmitTitle="Deposit"
                            onClickSubmit={async (amount) => {
                                // Set deposit amount for the spinbar
                                setDepositAmount(amount);

                                // Show the spinner
                                setIsDepositInProgress(true);

                                // Parse units
                                const depositAmount = utils.parseUnits(
                                    amount,
                                    underlyingTokenDecimal
                                );

                                // Send tx
                                await deposit.send(depositAmount);

                                // Turn of the spinner
                                setIsDepositInProgress(false);

                                // Display the receipt
                                setIsDepositCompleted(true);
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
                <title>Deposit USDC | Risedle Protocol</title>
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

export default LendDeposit;
