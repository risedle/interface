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
        <div className="h-full w-full overflow-clip bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Risedle Protocol</title>
                <meta name="description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            </Head>
            <Favicon />
            <Navigation />
            <div className="relative w-full justify-center overflow-hidden">
                <div className="relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 px-4 py-32 text-center align-middle">
                    <div>
                        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-light-10 dark:text-gray-dark-10">Page not Found</p>
                    </div>
                    <div className="flex items-center">
                        <h1 className="hero-text">404</h1>
                    </div>
                    <div className="mx-auto max-w-lg">
                        <h2 className="text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10">Uh oh, seems the page you&apos;re searching is not there</h2>
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
                <svg width="100%" viewBox="0 0 1159 1027" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[10%] left-1/2 z-0 w-[679px] -translate-x-1/2 stroke-gray-light-12 opacity-50 dark:stroke-white sm:fixed sm:top-[18%]" style={{ minWidth: "619px" }}>
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="222.549" />
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="299.389" />
                    <circle opacity="0.05" cx="579.5" cy="447.5" r="389.035" />
                    <circle opacity="0.1" cx="579.5" cy="447.5" r="579" />
                </svg>
            </div>
            <div className="mt-16 sm:absolute sm:inset-x-0 sm:bottom-0">
                <Footer />
            </div>
        </div>
    );
};

export default PageNotFound;
