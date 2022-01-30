import Head from "next/head";
import Link from "next/link";
import type { FunctionComponent } from "react";
import Favicon from "../Favicon";
import Footer from "../Footer";
import Navigation from "../HomePage/Navigation";
import ButtonSpecials from "../Buttons/ButtonSpecials";

/**
 * PageNotFoundProps is a React Component properties that passed to React Component PageNotFound
 */
type PageNotFoundProps = {};

/**
 * PageNotFound is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PageNotFound: FunctionComponent<PageNotFoundProps> = ({}) => {
    // By default use dark theme

    return (
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter overflow-clip">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            </Head>
            <Favicon />
            <Navigation />
            <div className="relative w-full justify-center overflow-hidden">
                <div className="z-10 relative flex flex-col px-4 text-center max-w-screen-md m-auto align-middle py-32 items-center gap-8">
                    <div>
                        <p className="text-xs font-semibold text-gray-light-10 dark:text-gray-dark-10 uppercase text-center tracking-widest">Page not Found</p>
                    </div>
                    <div className="flex items-center">
                        <h1 className="hero-text">404</h1>
                    </div>
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-base text-gray-light-10 dark:text-gray-dark-10 leading-relaxed">Uh oh, seems the page you&apos;re searching is not there</h2>
                    </div>
                    <div className="mt-6">
                        <Link href={"/"}>
                            <a>
                                <ButtonSpecials>
                                    <span className="mr-2">&#8592;</span> Back to Landing Page
                                </ButtonSpecials>
                            </a>
                        </Link>
                    </div>
                </div>
                <svg width="100%" viewBox="0 0 1159 1027" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-0 absolute sm:fixed top-[10%] sm:top-[18%] left-1/2 -translate-x-1/2 stroke-gray-light-12 dark:stroke-white w-[679px] opacity-50" style={{ minWidth: "619px" }}>
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="222.549" />
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="299.389" />
                    <circle opacity="0.05" cx="579.5" cy="447.5" r="389.035" />
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="579" />
                </svg>
            </div>
            <div className="mt-16 sm:absolute sm:bottom-0 sm:inset-x-0">
                <Footer />
            </div>
        </div>
    );
};

export default PageNotFound;
