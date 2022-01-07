import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";

// Import wallet connect connector
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Import the useDapp
import {
    useTokenAllowance,
    useEthers,
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

const LendWithdraw: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance of vault token
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

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
        console.log(localStorage.getItem('walletconnect'))
        if(localStorage.getItem('walletconnect')){
            setTimeout(() => {
                connectWalletConnect()
            }, 1); 
        }
    }, [])

    // Check vault token allowance
    const allowance = useTokenAllowance(
        RisedleMarket.address,
        account,
        RisedleMarket.address
    );
    console.debug("Risedle: rvUSDC Address", RisedleMarket.address);
    console.debug("Risedle: rvUSDC Allowance", allowance);

    // Get rvUSDC balance
    let rvUSDCBalance = "0";
    const rvUSDCBalanceBigNum = useTokenBalance(RisedleMarket.address, account);
    if (rvUSDCBalanceBigNum) {
        rvUSDCBalance = utils.formatUnits(rvUSDCBalanceBigNum, 6);
        // Rounding down
        rvUSDCBalance = (
            Math.floor(parseFloat(rvUSDCBalance) * 100) / 100
        ).toFixed(2);
    }
    console.debug("Risedle: USDC Balance", rvUSDCBalance);

    // Create Risedle vault token contract and function that we uses
    const risedleContract = new Contract(
        RisedleMarket.address,
        RisedleMarket.interface
    );
    const risedleVaultTokenApproval = useContractFunction(
        risedleContract,
        "approve",
        {
            transactionName: "Approve",
        }
    );

    // Setup states for vault token approval
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get approval transaction link
    let approvalTransactionLink = "";
    if (risedleVaultTokenApproval.state.transaction?.hash) {
        const transactionHash =
            risedleVaultTokenApproval.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Use redeem function
    const risedleRedeemUSDC = useContractFunction(
        risedleContract,
        "removeSupply(uint256)",
        {
            transactionName: "RemoveSupply",
        }
    );

    // Setup states for redeem process
    let [isRedeemInProgress, setIsRedeemInProgress] = useState(false);
    let [isRedeemCompleted, setIsRedeemCompleted] = useState(false);
    let [redeemAmount, setRedeemAmount] = useState("0");

    // Get redeem transaction link
    let redeemTransactionLink = "";
    if (risedleRedeemUSDC.state.transaction?.hash) {
        const transactionHash = risedleRedeemUSDC.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            redeemTransactionLink = link;
        }
    }

    // Get minted amount
    let redeemedAmount = "0";
    if (risedleRedeemUSDC.events) {
        // Get the SupplyAdded event
        const event = risedleRedeemUSDC.events.filter(
            (log) => log.name == "VaultSupplyRemoved"
        );
        const redeemedAmountBigNumber = event[0].args.redeemedAmount;
        redeemedAmount = utils.formatUnits(redeemedAmountBigNumber, 6);
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
                        subTitle="Now you can continue to withdraw"
                        transactionLink={approvalTransactionLink}
                        onClose={onClose}
                    />
                </div>
            );
        }

        // If deposit in progress, display the spinner
        if (isRedeemInProgress) {
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
        if (isRedeemCompleted) {
            const onClose = () => {
                setIsRedeemCompleted(false);
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
                            backTitle="← Go back to lend"
                            backURL="/lend"
                            title="Withdraw USDC"
                            subTitle="Burn rvUSDC to receive USDC."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="rvUSDC"
                            formInputTokenBalance={rvUSDCBalance}
                            formOutputToken="USDC"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await risedleVaultTokenApproval.send(
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

                                // Show the spinner
                                setIsRedeemInProgress(true);

                                // Parse units
                                const redeemAmountParsed = utils.parseUnits(
                                    amount,
                                    6
                                );

                                // Send tx
                                await risedleRedeemUSDC.send(
                                    redeemAmountParsed
                                );

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
                account={account}
                deactivate={async() => deactivate()}
            />
            {mainDisplay(account, allowance)}
        </div>
    );
};

export default LendWithdraw;
