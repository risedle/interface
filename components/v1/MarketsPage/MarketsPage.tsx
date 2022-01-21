import type { FunctionComponent } from "react";
import Head from "next/head";

import Favicon from "../Favicon";
import Navigation from "./Navigation";
import Header from "./Header";
import MarketCards from "./MarketCards";
import Footer from "../Footer";

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
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen">
            <Head>
                <title>Leveraged Tokens Market | Risedle</title>
                <meta name="description" content="Invest, earn and build on the decentralized leveraged token market protocol" />
            </Head>
            <Favicon />
            <Navigation />
            <div className="mt-8">
                <Header />
            </div>
            <div className="mt-6 mb-12">
                <MarketCards />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MarketsPage;
