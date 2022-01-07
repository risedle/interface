import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";

// Import wallet connect connector
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Import the useDapp
import {
    useEthers,
    useTokenAllowance,
    useContractFunction,
    getExplorerTransactionLink,
    ChainId,
    useTokenBalance,
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
import RisedleMarket from "../../abis/RisedleMarket";
import ERC20 from "../../abis/ERC20";

const LendDeposit: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Read data from chain

    // Setup hooks
    const { activateBrowserWallet, account, deactivate, activate } = useEthers();
    console.debug("Risedle: account", account);

    // Get the Kovan URL from .env file
    let kovanURL = "";
    if (process.env.NEXT_PUBLIC_KOVAN_URL) {
        kovanURL = process.env.NEXT_PUBLIC_KOVAN_URL;
    }

    // Setup Wallet Connect Configuration
    const walletconnect = new WalletConnectConnector({
        rpc: {
            42: kovanURL
        },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true, 
        supportedChainIds: [42],
        chainId: 42
    })

    // Activate WalletConnect
    const connectWalletConnect = async() => {
        await activate(walletconnect, undefined, true).catch((error) => {
            console.log(error)
        });
    }

    // Automatically connect to WalletConnect on page refresh (if already authenticated)
    useEffect(() => {
        if(localStorage.getItem('walletconnect')){
            setTimeout(() => {
                connectWalletConnect()
            }, 1); 
        }
    }, [])

    // Check USDC allowance
    const allowance = useTokenAllowance(
        ERC20.usdc,
        account,
        RisedleMarket.address
    );
    console.debug("Risedle: USDC Address", ERC20.usdc);
    console.debug("Risedle: USDC Allowance", allowance);

    // Get USDC balance
    let usdcBalance = "0";
    const usdcBalanceBigNum = useTokenBalance(ERC20.usdc, account);
    if (usdcBalanceBigNum) {
        usdcBalance = utils.formatUnits(usdcBalanceBigNum, 6);
        // Rounding down
        usdcBalance = (Math.floor(parseFloat(usdcBalance) * 100) / 100).toFixed(
            2
        );
    }
    console.debug("Risedle: USDC Balance", usdcBalance);

    // Create the USDC contract and function that we use
    const usdcContract = new Contract(ERC20.usdc, ERC20.interface);
    const usdcApproval = useContractFunction(usdcContract, "approve", {
        transactionName: "Approve",
    });

    // Setup states for the approval
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get approval transaction link
    let usdcApprovalTransactionLink = "";
    if (usdcApproval.state.transaction?.hash) {
        const transactionHash = usdcApproval.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            usdcApprovalTransactionLink = link;
        }
    }

    // Create the Risedle contract and function that we use
    const risedleContract = new Contract(
        RisedleMarket.address,
        RisedleMarket.interface
    );
    const risedleLendDeposit = useContractFunction(
        risedleContract,
        "addSupply(uint256)",
        {
            transactionName: "AddSupply",
        }
    );

    // Setup states for the deposit process
    let [isDepositInProgress, setIsDepositInProgress] = useState(false);
    let [isDepositCompleted, setIsDepositCompleted] = useState(false);
    let [depositAmount, setDepositAmount] = useState("0");

    // Get deposit transaction link
    let risedleDeositTransactionLink = "";
    if (risedleLendDeposit.state.transaction?.hash) {
        const transactionHash = risedleLendDeposit.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            risedleDeositTransactionLink = link;
        }
    }

    // If deposit success, get minted amount
    // TODO(bayu): Handle error
    let mintedAmount = "0";
    if (risedleLendDeposit.events) {
        // Get the SupplyAdded event
        const event = risedleLendDeposit.events.filter(
            (log) => log.name == "VaultSupplyAdded"
        );
        const mintedAmountBigNumber = event[0].args.mintedAmount;
        mintedAmount = utils.formatUnits(mintedAmountBigNumber, 6);
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
                        activateWalletConnect={connectWalletConnect}
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
                        transactionLink={usdcApprovalTransactionLink}
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
                        subTitle="Now you can continue to deposit"
                        transactionLink={usdcApprovalTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (isDepositInProgress) {
            return (
                <div className="mt-16">
                    <TransactionInProgress
                        title={`Depositing ${depositAmount} USDC`}
                        subTitle="It may take a few minutes"
                        transactionLink={risedleDeositTransactionLink}
                    />
                </div>
            );
        }

        // If deposit is completed, display completed transaction in 20s
        if (isDepositCompleted) {
            const onClose = () => {
                setIsDepositCompleted(false);
            };

            return (
                <div className="mt-16">
                    <TransactionIsCompleted
                        title="Deposit completed"
                        subTitle={`You have received ${mintedAmount} rvUSDC`}
                        transactionLink={risedleDeositTransactionLink}
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
                            backTitle="← Go back to lend"
                            backURL="/lend"
                            title="Deposit USDC"
                            subTitle="Earn variable interest rate instantly."
                            formTitle="Deposit amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="USDC"
                            formInputTokenBalance={usdcBalance}
                            formOutputToken="rvUSDC"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await usdcApproval.send(
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
                            backTitle="← Go back to lend"
                            backURL="/lend"
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

                                // Show the spinner
                                setIsDepositInProgress(true);

                                // Parse units
                                const depositAmount = utils.parseUnits(
                                    amount,
                                    6
                                );

                                // Send tx
                                await risedleLendDeposit.send(depositAmount);

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
                account={account}
                deactivate={async() => deactivate()}
            />
            {mainDisplay(account, allowance)}
        </div>
    );
};

export default LendDeposit;
