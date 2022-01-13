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
import USDC_ICON from "../../public/USDC_ICON.png";

// Import ABIs
import RisedleMarket from "../../abis/RisedleMarket";

const Lend: NextPage = () => {
    // Setup hooks
    const { account, activateBrowserWallet, deactivate } = useEthers();

    // Read data from chain
    const results = useContractCalls([
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
            method: "getSupplyRatePerSecondInEther",
            args: [],
        },
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
            method: "vaultTotalOutstandingDebt",
            args: [],
        },
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
            method: "getTotalAvailableCash",
            args: [],
        },
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
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

    // console.log("DEBUG: supplyRateResult", supplyRateResult);
    // console.log(
    //     "DEBUG: totalOutstandingDebtResult",
    //     totalOutstandingDebtResult
    // );
    // console.log("DEBUG: totalAvailableCashResult", totalAvailableCashResult);

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
    let balanceResult: any = useTokenBalance(RisedleMarket.address, account);
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
            value: `${balance} rvUSDC`,
        },
        {
            title: "Total value",
            value: `${totalValueVaultToken} USDC`,
        },
    ];

    return (
        <div>
            <Head>
                <title>Earn {APY} APY | Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation activeMenu="lend" />
            <div className="mt-8 gap gap-y-8 flex flex-col">
                <DetailHeader
                    image={USDC_ICON.src}
                    title={`Earn ${APY} APY`}
                    subTitle={`TVL ${dollarUSLocale.format(TVL)} USDC`}
                    leftTitle="Deposit"
                    leftPath="/lend/deposit"
                    rightTitle="Withdraw"
                    rightPath="/lend/withdraw"
                />
                <DetailCard items={cardItems} />
            </div>
        </div>
    );
};

export default Lend;
