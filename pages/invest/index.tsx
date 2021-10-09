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
import WETH from "../../abis/WETH";
import Risedle from "../../abis/Risedle";
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
            abi: Risedle.interface,
            address: Risedle.address,
            method: "getETFInfo",
            args: [Risedle.ethrise],
        },
    ]);
    const [etfInfoResult] = results;
    let ethTotalCollateral = "0";
    if (etfInfoResult) {
        // @ts-ignore
        ethTotalCollateral = formatUnits(etfInfoResult.totalCollateral, 18);

        console.log("ethTotalCollateral", ethTotalCollateral);
    }

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

    // TODO: Get on-chain data NAV price
    // TODO: Get total AUM

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
            <Navigation
                activeMenu="invest"
                account={account}
                activateBrowserWallet={activateBrowserWallet}
                deactivate={deactivate}
            />
            <div className="mx-auto mt-16" style={{ width: "480px" }}>
                <div>
                    <h1 className="text-white font-extrabold text-4xl m-0 leading-normal">
                        Leveraged ETFs
                    </h1>
                    {displayAUM()}
                </div>
                <div className="flex flex-col gap gap-y-4 mt-8">
                    <ETFCard
                        title="ETHRISE"
                        subTitle="ETH 2x Leverage Risedle"
                        etfURL="/invest/ethrise"
                        navPrice="100 USDC"
                        change30d="+24%"
                    />
                    <ETFCard
                        title="BTCRISE"
                        subTitle="BTC 2x Leverage Risedle"
                        etfURL="/invest/btcrise"
                        navPrice="100 USDC"
                        change30d="+24%"
                    />
                </div>
            </div>
        </div>
    );
};

export default Invest;
