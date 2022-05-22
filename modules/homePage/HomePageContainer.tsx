import Head from "next/head";
import FeatureCardOneColumn from "./component/FeatureCardOneColumn";
import FeatureCardTwoColumns from "./component/FeatureCardTwoColumns";
import Hero from "./component/Hero";
import HeroFooter from "./component/HeroFooter";
import Navigation from "../../uikit/layout/Navigation";
import SubHero from "./component/SubHero";
import HomePageMeta from "./component/HomePageMeta";
import Favicon from "../../uikit/layout/Favicon";
import Footer from "../../uikit/layout/Footer";
import Jumbotron2 from "./component/v2/Jumbotron2";

function HomePageContainer() {
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
}

export default HomePageContainer;
