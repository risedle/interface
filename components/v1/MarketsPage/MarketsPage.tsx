import type { FunctionComponent } from "react";
import Head from "next/head";

import Favicon from "../Favicon";
import Navigation from "./Navigation";
import GoogleFont from "../GoogleFont";

/**
 * MarketsPageProps is a React Component properties that passed to React Component MarketsPage
 */
type MarketsPageProps = {};

/**
 * MarketsPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketsPage: FunctionComponent<MarketsPageProps> = ({}) => {
    // By default use dark theme

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter">
            <Head>
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            </Head>
            <GoogleFont />
            <Favicon />
            <Navigation />
        </div>
    );
};

export default MarketsPage;
