import Head from "next/head";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { chain as Chains } from "wagmi";
import { customChains } from "../../components/v1/Wallet";
import { useWalletContext } from "../../components/v1/Wallet";

import Navigation from "../../components/v1/Navigation";
import Favicon from "../../uikit/layout/Favicon";
import MarketsPageMeta from "./components/MarketsPageMeta";
import BackgroundCircle from "./components/BackgroundCircle";

/**
 * MarketsRouterProps is a React Component properties that passed to React Component MarketsRouter
 */
type MarketsRouterProps = {};

/**
 * MarketsRouter is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketsRouter: FunctionComponent<MarketsRouterProps> = ({}) => {
    const router = useRouter();
    const { account, chain } = useWalletContext();

    useEffect(() => {
        setTimeout(() => {
            if (!account || chain.unsupported || chain.chain.id === Chains.arbitrumOne.id) {
                router.push("/markets/arbitrum");
            }
            if (chain.chain.id === customChains.bsc.id) {
                router.push("/markets/binance");
            }
        }, 2000);
    }, [account]);

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                <MarketsPageMeta />
            </Head>
            <Favicon />

            {/* Temporary: awaiting design from mas Ayik*/}
            <div className="flex h-screen items-center justify-center">
                <p className="animate-pulse text-3xl font-bold text-gray-light-10 dark:text-gray-dark-10">Loading... (Temporary)</p>
            </div>
        </div>
    );
};

export default MarketsRouter;
