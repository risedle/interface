import type { FunctionComponent } from "react";
import Head from "next/head";

import MarketsHeader from "./components/MarketsHeader";
import BackgroundGradient from "./components/BackgroundGradient";
import MarketCardLoading from "./components/MarketCardLoading";
import Favicon from "../../uikit/layout/Favicon";
import Footer from "../../uikit/layout/Footer";
import MarketCard from "./components/MarketCard";
import ButtonConnectWalletMobile from "../../components/v1/Buttons/ConnectWalletMobile";
import MarketsPageMeta from "./components/MarketsPageMeta";
import { DEFAULT_CHAIN, useWalletContext } from "../../components/v1/Wallet";
import { useMarkets } from "../../components/v1/swr/useMarkets";
import Navigation from "../../components/v1/Navigation";

/**
 * MarketsPageContainerProps is a React Component properties that passed to React Component MarketsPageContainer
 */
type MarketsPageContainerProps = {};

/**
 * MarketsPageContainer is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketsPageContainer: FunctionComponent<MarketsPageContainerProps> = ({}) => {
    // Read global states
    const { chain } = useWalletContext();

    // Read data from Snapshot API
    const marketsResponse = useMarkets(chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id);

    // UI states
    const showLoading = marketsResponse.isLoading;
    const showError = !showLoading && marketsResponse.error;
    const showData = !showLoading && !showError && marketsResponse.data;

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                <MarketsPageMeta />
            </Head>
            <Favicon />

            <Navigation marketsActive />

            <div className="z-10 mt-8 flex min-h-screen flex-col items-center px-4 lg:mt-24">
                {/* Headers */}
                <MarketsHeader data={marketsResponse.data} showData={showData} showLoading={showLoading} />

                {/* Cards */}
                <div className="mx-auto mt-6 w-full max-w-[490px] sm:mt-8 lg:min-w-[992px] lg:max-w-[1104px]">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Cards loading state */}
                        {showLoading && (
                            <>
                                <MarketCardLoading />
                                <MarketCardLoading />
                                <MarketCardLoading />
                            </>
                        )}
                        {/* Cards display state */}
                        {showData && (
                            <>
                                {marketsResponse.data?.markets.map((market) => {
                                    return (
                                        <div key={market.leveraged_token_address}>
                                            <MarketCard address={market.leveraged_token_address} initialNAV={market.nav_last} initialNAVChange={market.leveraged_token_price_change_percent} totalSupply={market.leveraged_token_total_supply} />{" "}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="hidden sm:inline-block">
                <Footer />
            </div>

            <BackgroundGradient />

            <div className="z-10 sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </div>
    );
};

export default MarketsPageContainer;
