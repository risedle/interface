import type { NextPage } from "next";
import Head from "next/head";
import { useEthers } from "@usedapp/core";

// Import components
import Favicon from "../../components/Favicon";
import Navigation from "../../components/Navigation";
import ETFCard from "../../components/ETFCard";

const Invest: NextPage = () => {
    // Setup hooks
    const { account, activateBrowserWallet, deactivate } = useEthers();

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
                    <p className="text-grey font-semibold text-2xl m-0 leading-normal">
                        AUM $100,0000.00
                    </p>
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
