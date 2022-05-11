import Head from "next/head";
import Favicon from "../../uikit/layout/Favicon";
import Navigation from "../../components/v1/Navigation";
import Footer from "../../uikit/layout/Footer";
import { useWalletContext, DEFAULT_CHAIN } from "../../components/v1/Wallet";
import { Metadata } from "../../components/v1/MarketMetadata";
import MarketDetailPageMeta from "./component/MarketDetailPageMeta";
import ButtonConnectWalletMobile from "../../components/v1/Buttons/ConnectWalletMobile";
import BackgroundGradient from "./component/BackgroundGradient";
import TabsList from "./component/TabsList";
import TabsContentGrid from "./component/TabsContentGrid";
import PriceInfoCard from "./component/PriceInfoCard";
import LeveragedTokenBackingCard from "./component/LeveragedTokenBackingCard";
import LeveragedTokenInfoCard from "./component/LeveragedTokenInfoCard";
import MyAssetsCard from "./component/MyAssetsCard";

import { chain as Chains } from "wagmi";
import { Root as TabsRoot } from "@radix-ui/react-tabs";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.arbitrumOne.id]: "0x46D06cf8052eA6FdbF71736AF33eD23686eA1452",
};

function EthrisePageContainer() {
    const { chain } = useWalletContext();
    const chainID = chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id;
    const ethriseAddress = ETHRISEAddresses[chainID];
    const metadata = Metadata[chainID][ethriseAddress];
    return (
        <>
            <div className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    <title>{metadata.title} Market | Risedle Protocol</title>
                    <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
                    <MarketDetailPageMeta title={metadata.title} path={metadata.path} />
                </Head>
                <Favicon />
                <Navigation marketsActive portfolioActive />
                <div className="mb-20 flex flex-grow flex-col sm:z-10 sm:mb-0">
                    <TabsRoot defaultValue="leverage" className="px-4 outline-0 sm:mx-auto sm:mt-10">
                        <TabsList />
                        {/* Leverage Tab */}
                        <TabsContentGrid value="leverage">
                            {/* Left Column */}
                            <PriceInfoCard title={metadata.title} subtitle={metadata.subtitle} logo={metadata.logo} tokenAddress={ethriseAddress} />

                            {/* Right Column */}
                            <div className="flex max-w-[540px] flex-col space-y-6">
                                <MyAssetsCard address={ethriseAddress} />
                                <LeveragedTokenInfoCard address={ethriseAddress} />
                                <LeveragedTokenBackingCard address={ethriseAddress} />
                            </div>
                        </TabsContentGrid>
                    </TabsRoot>
                </div>
                <div className="hidden sm:mt-20 sm:inline-block">
                    <Footer />
                </div>
                <BackgroundGradient />
            </div>
            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    );
}

export default EthrisePageContainer;
