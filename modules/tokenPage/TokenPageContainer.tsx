import Head from "next/head";
import Favicon from "../../uikit/layout/Favicon";
import Navigation from "../../components/v1/Navigation";
import Footer from "../../uikit/layout/Footer";
import { Metadata } from "../../components/v1/MarketMetadata";
import MarketDetailPageMeta from "./component/MarketDetailPageMeta";
import ButtonConnectWalletMobile from "../../components/v1/Buttons/ConnectWalletMobile";
import BackgroundGradient from "./component/BackgroundGradient";
import BackgroundDots from "./component/BackgroundDots";
import TabsList from "./component/TabsList";
import TabsContentGrid from "./component/TabsContentGrid";
import PriceInfoCard from "./component/PriceInfoCard";
import LeveragedTokenBackingCard from "./component/LeveragedTokenBackingCard";
import LeveragedTokenInfoCard from "./component/TokenInformation/LeveragedTokenInfoCard";
import VaultInfoCard from "./component/VaultInfoCard";
import { Root as TabsRoot } from "@radix-ui/react-tabs";
import { FunctionComponent } from "react";
import { Calculator } from "./component/Calculator";

type TokenPageContainerProps = {
    chainID: number;
    tokenAddress: string;
};

const TokenPageContainer: FunctionComponent<TokenPageContainerProps> = ({ chainID, tokenAddress }) => {
    const metadata = Metadata[chainID][tokenAddress];
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
                <div className="mb-20 mt-[76px] flex flex-grow flex-col sm:z-10 sm:mb-0 sm:mt-[120px]">
                    <TabsRoot defaultValue="leverage" className="px-4 outline-0 sm:mx-auto">
                        <TabsList />
                        {/* Leverage Tab */}
                        <TabsContentGrid value="leverage">
                            {/* Left Column */}
                            <PriceInfoCard chainID={chainID} title={metadata.title} subtitle={metadata.subtitle} logo={metadata.logo} tokenAddress={tokenAddress} />

                            {/* Right Column */}
                            <div className="flex max-w-[540px] flex-col space-y-6">
                                <LeveragedTokenInfoCard chainID={chainID} address={tokenAddress} />
                                <Calculator />
                                <LeveragedTokenBackingCard chainID={chainID} address={tokenAddress} />
                            </div>
                        </TabsContentGrid>

                        {/* Lend Tab */}
                        <TabsContentGrid value="lend">
                            {/* Left Column */}
                            <PriceInfoCard chainID={chainID} title={metadata.vaultTitle} subtitle={metadata.subtitle} logo={metadata.vaultLogo} tokenAddress={tokenAddress} isVault vaultAddress={metadata.vaultAddress} />

                            {/* RightColumn */}
                            <div className="max-w-[540px] flex-col space-y-6">
                                <VaultInfoCard chainID={chainID} address={tokenAddress} />
                            </div>
                        </TabsContentGrid>
                    </TabsRoot>
                </div>
                <div className="hidden sm:mt-20 sm:inline-block">
                    <Footer />
                </div>
                <BackgroundDots />
                <BackgroundGradient chainID={chainID} />
            </div>
            <div className="sm:hidden">
                <ButtonConnectWalletMobile />
            </div>
        </>
    );
};

export default TokenPageContainer;
