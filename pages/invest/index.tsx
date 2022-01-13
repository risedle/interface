import type { NextPage } from "next";
import Head from "next/head";

// useDapp
import { useEthers, useContractCalls } from "@usedapp/core";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { formatUnits } from "@ethersproject/units";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ETFCard from "../../components/ETFCard";

// Import abis
import RisedleMarket from "../../abis/RisedleMarket";
import AUMLoading from "../../components/AUMLoading";
import AUMLoaded from "../../components/AUMLoaded";

const Invest: NextPage = () => {
    // Setup hooks
    const { account, activateBrowserWallet, deactivate } = useEthers();

    // Get ethereum price
    const etherPrice = useCoingeckoPrice("ethereum", "usd");
    // If undefined show the loader
    console.log("etherPrice", etherPrice);
    // Get ETF info
    // Read data from chain
    const results = useContractCalls([
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
            method: "getETFInfo",
            args: [RisedleMarket.ethrise],
        },
        {
            abi: RisedleMarket.interface,
            address: RisedleMarket.address,
            method: "getETFNAV",
            args: [RisedleMarket.ethrise],
        },
    ]);
    const [etfInfoResult, ethriseNAVResult] = results;

    // Total AUM
    let AUM: string | undefined = undefined;
    if (etherPrice && etfInfoResult) {
        // TODO (bayu): It should be minus totalPendingFees
        const ethTotalCollateral = formatUnits(
            // @ts-ignore
            etfInfoResult.totalCollateral,
            18
        );
        const AUMFloat =
            parseFloat(etherPrice) * parseFloat(ethTotalCollateral);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        AUM = `$${dollarUSLocale.format(AUMFloat)}`;
    }

    console.log("AUM", AUM);

    // Display AUM
    const displayAUM = () => {
        if (AUM) {
            return <AUMLoaded text={AUM} />;
        }
        return <AUMLoading />;
    };

    // Get NAV data
    let ethriseNAV: string = "- USDC";
    if (ethriseNAVResult) {
        const nav = formatUnits(
            // @ts-ignore
            ethriseNAVResult.etfNAV,
            6
        );
        // @ts-ignore
        console.log("DEBUG: ethriseNAVResult.etfNAV", ethriseNAVResult.etfNAV);
        const navFloat = parseFloat(nav);
        console.log("DEBUG: navFloat", navFloat);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        ethriseNAV = `${dollarUSLocale.format(navFloat)} USDC`;
    }

    return (
        <div>
            <Head>
                <title>Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation activeMenu="invest" />
            <div className="mx-auto mt-16" style={{ width: "480px" }}>
                <div>
                    <h1 className="text-white font-extrabold text-4xl m-0 leading-normal">
                        Leveraged Tokens
                    </h1>
                    {displayAUM()}
                </div>
                <div className="flex flex-col gap gap-y-4 mt-8">
                    <ETFCard
                        title="ETHRISE"
                        subTitle="ETH 2x Leverage Risedle"
                        etfURL="/invest/ethrise"
                        navPrice={ethriseNAV}
                        change30d="--%"
                    />
                    <ETFCard
                        title="BTCRISE"
                        subTitle="BTC 2x Leverage Risedle"
                        etfURL="/invest"
                        navPrice="-- USDC"
                        change30d="-- %"
                    />
                </div>
            </div>
        </div>
    );
};

export default Invest;
