import type { FunctionComponent } from "react";
import Head from "next/head";
import { chain as Chains } from "wagmi";

import Favicon from "../Favicon";
import Navigation from "../Navigation/MarketNavigation";
import Footer from "../Footer";
import * as Tabs from "@radix-ui/react-tabs";
import PriceChart from "./PriceChart";
import { useWalletContext } from "../Wallet";
import { Metadata } from "../MarketMetadata";
import { useLeveragedTokenData3Months } from "../../../utils/snapshot";

// ETHRISE Token ids
const ETHRISEAddresses = {
    [Chains.kovan.id]: "0xc4676f88663360155c2bc6d2A482E34121a50b3b",
};

/**
 * ETHRISEPageProps is a React Component properties that passed to React Component ETHRISEPage
 */
type ETHRISEPageProps = {};

/**
 * ETHRISEPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ETHRISEPage: FunctionComponent<ETHRISEPageProps> = ({}) => {
    const { chain } = useWalletContext();
    const ethriseAddress = ETHRISEAddresses[chain.id];

    // Get ETHRISE metadata
    const metadata = Metadata[chain.id][ethriseAddress];
    const title = metadata.title;
    const subtitle = metadata.subtitle;
    const logo = metadata.logo;
    const description = metadata.description;

    // Get price external data from Risedle Snapshot
    const { data, isLoading, isError } = useLeveragedTokenData3Months(chain.id, ethriseAddress);

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden">
            <Head>
                <title>ETHRISE - ETH Leveraged Token | Risedle</title>
                <meta name="description" content="Leverage ETH or earn yield from your idle USDC" />
            </Head>
            <Favicon />
            <div className="z-10 flex flex-col">
                <Navigation />

                {/* Market header on the desktop; Only show this on w > 640px */}
                <div className="hidden sm:inline-block flex flex-col m-auto text-center space-y-6 mt-12 mb-14">
                    <div>
                        <img src={logo} alt={title} className="w-[64px] h-[64px] inline-block" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="m-0 text-[32px] leading-none tracking-[-.02em] font-bold text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                        <p className="text-sm text-gray-light-10 dark:text-gray-dark-10">{description}</p>
                    </div>
                </div>

                {/* Market tabs and content */}
                <Tabs.Root defaultValue="leverage" className="px-4">
                    <Tabs.List aria-label="ETHRISE" className="bg-gray-light-3 dark:bg-gray-dark-2 rounded-[12px] flex flex-row p-1 mx-auto sm:max-w-[253px]">
                        <Tabs.Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                            Leverage
                        </Tabs.Trigger>
                        <Tabs.Trigger value="earn" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10 state-active:text-gray-light-12 state-active:dark:text-gray-dark-12 state-active:font-bold state-active:py-[12px] state-active:dark:bg-gray-dark-4 state-active:bg-gray-light-1">
                            Earn
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="leverage" className="flex flex-col mt-6">
                        {/* Price chart and mint button */}
                        <div className="flex flex-col bg-gray-light-2 dark:bg-gray-dark-2 rounded-[16px]">
                            <div className="flex flex-row p-4 items-center justify-between">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                                    <h1 className="m-0 text-2xl tracking-tighter text-gray-light-12 dark:text-gray-dark-12 tracking-[-.02em]">{title}</h1>
                                </div>
                                <img src={logo} alt={title} />
                            </div>

                            <div>price and change</div>
                        </div>

                        <div>card 2</div>
                        <div>card 3</div>
                    </Tabs.Content>
                    <Tabs.Content value="earn">Earn</Tabs.Content>
                </Tabs.Root>
                <div className="mt-6 mb-12">test</div>
                <div className="pb-20 sm:pb-0">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ETHRISEPage;
