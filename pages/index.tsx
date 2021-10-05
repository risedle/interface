import type { NextPage } from "next";
import Head from "next/head";

// Import components
import Favicon from "../components/Favicon";
import Navigation from "../components/Navigation";

const Home: NextPage = () => {
    return (
        <div className="bg-black">
            <Head>
                <title>Risedle Protocol</title>
                <meta
                    name="description"
                    content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol"
                />
            </Head>
            <Favicon />
            <Navigation />
        </div>
    );
};

export default Home;
