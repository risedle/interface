import type { NextPage } from "next";
import Head from "next/head";

// Import the useDapp
import { useContractCalls, useTokenBalance, useEthers } from "@usedapp/core";
import { utils } from "ethers";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import DetailHeader from "../../components/DetailHeader";
import DetailCard from "../../components/DetailCard";

// PNG files
import ETHRISE_ICON from "../../public/ETHRISE_ICON.png";

// Import ABIs
const vaultInterface = new utils.Interface([
    "function getSupplyRatePerSecondInEther() view returns (uint256)",
    "function totalOutstandingDebt() view returns (uint256)",
    "function getTotalAvailableCash() view returns (uint256)",
    "function getExchangeRateInEther() view returns (uint256)",
]);
const vaultContractAddress = "0xECDC27a6214E3BC4715af5cB5706E03259e7A1f8";

const ETHRISE: NextPage = () => {
    // 1. Get user balance of ETHRISE
    // 2. Get NAV price
    // 3. Get market cap
    // 4. Get borrow APY
    // 5. Get Underlying asset

    // Setup hooks
    const { account, activateBrowserWallet, deactivate } = useEthers();

    // Read data from chain
    const results = useContractCalls([
        {
            abi: vaultInterface,
            address: vaultContractAddress,
            method: "getSupplyRatePerSecondInEther",
            args: [],
        },
        {
            abi: vaultInterface,
            address: vaultContractAddress,
            method: "totalOutstandingDebt",
            args: [],
        },
        {
            abi: vaultInterface,
            address: vaultContractAddress,
            method: "getTotalAvailableCash",
            args: [],
        },
        {
            abi: vaultInterface,
            address: vaultContractAddress,
            method: "getExchangeRateInEther",
            args: [],
        },
    ]);
    const [
        supplyRateResult,
        totalOutstandingDebtResult,
        totalAvailableCashResult,
        currentExchangeRateInEtherResult,
    ] = results;

    // Get supply APY
    let supplyRatePerSecond = 0;
    if (supplyRateResult) {
        supplyRatePerSecond = supplyRateResult[0] / 1e18;
    }
    // console.log("DEBUG: supplyRatePerSecond", supplyRatePerSecond);
    const secondsPerDay = 86400;
    const daysPerYear = 365;
    const supplyAPY =
        (Math.pow(supplyRatePerSecond * secondsPerDay + 1, daysPerYear) - 1) *
        100;
    // console.log("DEBUG: supplyAPY", supplyAPY);
    const APY = `${supplyAPY.toFixed(2)}%`;

    // Get total TVL
    let totalOutstandingDebt = 0;
    if (totalOutstandingDebtResult) {
        totalOutstandingDebt = totalOutstandingDebtResult[0] / 1e6;
    }
    let totalAvailableCash = 0;
    if (totalAvailableCashResult) {
        totalAvailableCash = totalAvailableCashResult[0] / 1e6;
    }
    // console.log("DEBUG: totalOutstandingDebt", totalOutstandingDebt);
    // console.log("DEBUG: totalAvailableCash", totalAvailableCash);
    const TVL = totalOutstandingDebt + totalAvailableCash;
    // console.log("DEBUG: TVL", TVL);
    let dollarUSLocale = Intl.NumberFormat("en-US");

    // Get user vault token balance
    // TODO (bayu): Get decimals from contract
    let balance: any = 0.0;
    let balanceResult: any = useTokenBalance(vaultContractAddress, account);
    // console.log("DEBUG: balanceResult", balanceResult);
    if (balanceResult) {
        balance = balanceResult / 1e6; // TODO use decimals here from conttract
    }
    // console.log("DEBUG: balance", balance);

    // The the total value
    let currentExchangeRate = 1.0;
    if (currentExchangeRateInEtherResult) {
        currentExchangeRate = currentExchangeRateInEtherResult[0] / 1e18;
    }
    // console.log(
    //     "DEBUG: currentExchangeRateInEtherResult",
    //     currentExchangeRateInEtherResult
    // );
    // console.log("DEBUG: currentExchangeRate", currentExchangeRate);
    const totalValueVaultToken = balance * currentExchangeRate;
    // console.log("DEBUG: totalValueVaultToken", totalValueVaultToken);

    // Display the value
    const cardItems = [
        {
            title: "Your balance",
            value: `12 ETHRISE`,
        },
        {
            title: "NAV",
            value: `12 USDC`,
        },
        {
            title: "Market Cap",
            value: `$12b`,
        },
        {
            title: "Borrow APY",
            value: "12% APY",
        },
        // {
        //     title: "Underlying asset",
        //     value: `12 WETH\n-12,312 USDC`,
        // },
    ];

    return (
        <div>
            <Head>
                <title>
                    ETHRISE - ETH 2x Leveraged Token | Risedle Protocol
                </title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation
                activeMenu="ETHRISE"
                account={account}
                activateBrowserWallet={activateBrowserWallet}
                deactivate={deactivate}
            />
            <div className="mt-8 gap gap-y-8 flex flex-col">
                <DetailHeader
                    image={ETHRISE_ICON.src}
                    title="ETH 2x Leverage"
                    subTitle="Without risk of liquidation and without paying management fees"
                    leftTitle="Mint"
                    leftPath="/ethrise/mint"
                    rightTitle="Redeem"
                    rightPath="/ethrise/redeem"
                />
                <DetailCard items={cardItems} />
            </div>
        </div>
    );
};

export default ETHRISE;
