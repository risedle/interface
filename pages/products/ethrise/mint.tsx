import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
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
    useContractEvent, 
    useContractWrite, 
    useWaitForTransaction,
    chain,
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

const MintETHRISE: NextPage = () => {
    // 1. Check wether the account is connected or not
    // 2. If not, display the connect wallet prompt
    // 3. If connected, check the allowance
    // 4. If there is no allowance, display the approval form
    //    4.1 If user send approve, then display transaction progress
    //    4.2 Show transaction completed in 2s, then display the deposit form
    // 5. Otherwise user connected and ready to deposit

    // Setup hooks
    const [{data: accountData}, disconnect] = useAccount();
    console.debug("Risedle: account", accountData?.address);
    const router = useRouter();

    // Check if account is connected, if no user will be redirected to /connect
    useEffect(() => {
        if (!accountData?.address) {
            router.push('/connect');
        }
    }, [accountData])

    // Check WETH allowance
    const allowance = useTokenAllowance(
        ERC20.weth,
        accountData?.address,
        RisedleMarket.address
    );
    console.debug("Risedle: allowance", allowance);

    // Get WETH balance
    let wethBalance = "0";
    const wethBalanceBigNum = useTokenBalance(ERC20.weth, accountData?.address);
    if (wethBalanceBigNum) {
        wethBalance = utils.formatUnits(wethBalanceBigNum, 18);
        // Rounding down
        wethBalance = (Math.floor(parseFloat(wethBalance) * 100) / 100).toFixed(
            2
        );
    }

    // Create function to approve WETH
    const [wethApprovalResult, writeApproval] = useContractWrite(
        {
            addressOrName: ERC20.weth,
            contractInterface: ERC20.interface,
        },
        'approve',
    )

    // Setup weth approval transaction wait
    const [ waitWethApprovalResult, waitWethApprovalFunc] = useWaitForTransaction({
        wait: wethApprovalResult.data?.wait
    })
    
    // Setup completed state for approval
    const [isApprovalCompleted, setIsApprovalCompleted] = useState(false)

    // Get the weth approval transaction link
    let approvalTransactionLink = "";
    if (wethApprovalResult.data?.hash) {
        const transactionHash = wethApprovalResult.data?.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            approvalTransactionLink = link;
        }
    }

    // Create function to mint ETHRISE
    const [ETHRISEMintResult, writeETHRISEMint] = useContractWrite(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'invest',
    )

    // Setup ETHRISE minting transaction wait
    const [ waitETHRISEMintResult, waitETHRISEMintFunc] = useWaitForTransaction({
        wait: ETHRISEMintResult.data?.wait
    })

    // Setup states for mint process
    let [isMintCompleted, setIsMintCompleted] = useState(false);
    let [mintWETHAmount, setMintWETHAmount] = useState("0");

    // Get mint transaction link
    let mintTransactionLink = "";
    if (ETHRISEMintResult.data?.hash) {
        const transactionHash = ETHRISEMintResult.data.hash;
        const link = getExplorerTransactionLink(transactionHash, chain.kovan.id);
        if (link) {
            mintTransactionLink = link;
        }
    }

    //get minted ETHRISE amount event
    const [mintedEvent, setMintedEvent] = useState([])
    useContractEvent(
        {
            addressOrName: RisedleMarket.address,
            contractInterface: RisedleMarket.interface
        },
        'ETFMinted',
        (e) => setMintedEvent(e)
    )

    // Get minted amount
    let mintedAmount = "0";
    if (mintedEvent[2]) {
        const mintedAmountBigNumber = mintedEvent[2]
        mintedAmount = utils.formatUnits(mintedAmountBigNumber, 18);
    }

    const mainDisplay = (
        allowance: BigNumber | undefined,
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
        if (waitETHRISEMintResult.loading) {
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
        if (waitETHRISEMintResult.data && isMintCompleted) {
            const onClose = () => {
                setIsMintCompleted(false);
                setMintedEvent([]);
                mintedAmount="0";
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
                            backURL="/products/ethrise"
                            title="Mint ETHRISE"
                            subTitle="Deposit WETH and receive ETHRISE in exchange."
                            formTitle="Mint amount"
                            formPlaceholder="Enter deposit amount"
                            formInputToken="WETH"
                            formInputTokenBalance={wethBalance}
                            formOutputToken="ETHRISE"
                            onClickApprove={async () => {
                                // Send the tx
                                await writeApproval(
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
                                await writeETHRISEMint(
                                    {
                                        args: [RisedleMarket.ethrise, depositAmount]
                                    }
                                );
                                console.debug(
                                    "Risedle: risedleETHRISEMint",
                                    ETHRISEMintResult
                                );
                                console.debug("Risedle: WHYY?");

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
            <Navigation
                activeMenu="products"
            />
            {mainDisplay(allowance)}
        </div>
    );
};

export default MintETHRISE;