import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";

// Import WalletConnect connector
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

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

const RedeemETHRISE: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
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
        if(localStorage.getItem('walletconnect')){
            setTimeout(() => {
                connectWalletConnect()
            }, 1); 
        }
    }, [])

    // Check ETHRISE allowance
    const allowance = useTokenAllowance(
        RisedleMarket.ethrise,
        account,
        RisedleMarket.address
    );
    console.debug("Risedle: allowance", allowance);

    // Get ETHRISE balance
    let ethriseBalance = "0";
    const ethriseBalanceBigNum = useTokenBalance(
        RisedleMarket.ethrise,
        account
    );
    if (ethriseBalanceBigNum) {
        ethriseBalance = utils.formatUnits(ethriseBalanceBigNum, 18);
        // Rounding down
        ethriseBalance = (
            Math.floor(parseFloat(ethriseBalance) * 100) / 100
        ).toFixed(2);
    }

    // Create the WETH contract and function that we use
    const ethriseContract = new Contract(
        RisedleMarket.ethrise,
        ERC20.interface
    );
    const ethriseApproval = useContractFunction(ethriseContract, "approve", {
        transactionName: "Approve",
    });
    console.debug("Risedle: RisedleMarket.ethrise", RisedleMarket.ethrise);

    // Setup states for approval
    let [isApprovalInProgress, setIsApprovalInProgress] = useState(false);
    let [isApprovalCompleted, setIsApprovalCompleted] = useState(false);

    // Get the approval transaction link
    let approvalTransactionLink = "";
    if (ethriseApproval.state.transaction?.hash) {
        const transactionHash = ethriseApproval.state.transaction?.hash;
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
    const risedleRedeem = useContractFunction(risedleContract, "redeem", {
        transactionName: "Redeem",
    });
    console.debug("Risedle: RisedleMarket.address", RisedleMarket.address);

    // Setup states for mint process
    let [isRedeemInProgress, setIsRedeemInProgress] = useState(false);
    let [isRedeemCompleted, setIsRedeemCompleted] = useState(false);
    let [burnedETHRISEAmount, setBurnedETHRISEAmount] = useState("0");

    // Get mint transaction link
    let mintTransactionLink = "";
    if (risedleRedeem.state.transaction?.hash) {
        const transactionHash = risedleRedeem.state.transaction?.hash;
        const link = getExplorerTransactionLink(transactionHash, ChainId.Kovan);
        if (link) {
            mintTransactionLink = link;
        }
    }

    // Get minted amount
    let redeemedAmount = "0";
    if (risedleRedeem.events) {
        // Get the SupplyAdded event
        const event = risedleRedeem.events.filter(
            (log) => log.name == "ETFBurned"
        );
        const redeemedAmountBigNumber = event[0].args.amount;
        redeemedAmount = utils.formatUnits(redeemedAmountBigNumber, 18);
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
        if (isRedeemInProgress) {
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
        if (isRedeemCompleted) {
            const onClose = () => {
                setIsRedeemCompleted(false);
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
                            backURL="/invest/ethrise"
                            title="Redeem ETHRISE"
                            subTitle="Burn ETHRISE to receive WETH in exchange."
                            formTitle="Redeem amount"
                            formPlaceholder="Enter redeem amount"
                            formInputToken="ETHRISE"
                            formInputTokenBalance={ethriseBalance}
                            formOutputToken="WETH"
                            onClickApprove={async () => {
                                // Display spinner
                                setIsApprovalInProgress(true);

                                // Send the tx
                                await ethriseApproval.send(
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

                                // Show the spinner
                                setIsRedeemInProgress(true);

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
                                await risedleRedeem.send(
                                    RisedleMarket.ethrise,
                                    redeemAmount
                                );
                                console.debug(
                                    "Risedle: risedleRedeem",
                                    risedleRedeem
                                );
                                console.debug("Risedle: WHYY?");

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
                <title>Redeem ETHRISE | Risedle Protocol</title>
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

export default RedeemETHRISE;
