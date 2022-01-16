import type { FunctionComponent } from "react";
import Head from "next/head";

import Favicon from "../Favicon";
import Navigation from "./Navigation";
import Hero from "./Hero";
import SubHero from "./SubHero";
import FeatureCardOneColumn from "./FeatureCardOneColumn";
import FeatureCardTwoColumns from "./FeatureCardTwoColumns";
import HeroFooter from "./HeroFooter";
import Footer from "./Footer";
import GoogleFont from "../GoogleFont";

/**
 * HomePageProps is a React Component properties that passed to React Component HomePage
 */
type HomePageProps = {};

/**
 * HomePage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const HomePage: FunctionComponent<HomePageProps> = ({}) => {
    // By default use dark theme

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter">
            <Head>
                <title>Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <GoogleFont />
            <Favicon />
            <Navigation />
            <Hero />
            <SubHero />
            <FeatureCardOneColumn />
            <div className="my-4">
                <FeatureCardTwoColumns />
            </div>
            <HeroFooter />
            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
