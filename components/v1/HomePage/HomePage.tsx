import Head from "next/head";
import type { FunctionComponent } from "react";
import Favicon from "../Favicon";
import FeatureCardOneColumn from "./FeatureCardOneColumn";
import FeatureCardTwoColumns from "./FeatureCardTwoColumns";
import Footer from "../Footer";
import Hero from "./Hero";
import HeroFooter from "./HeroFooter";
import Navigation from "./Navigation";
import SubHero from "./SubHero";
import HomePageMeta from "./HomePageMeta";

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
        <div className="h-full w-full overflow-clip bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
                <HomePageMeta />
            </Head>
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
