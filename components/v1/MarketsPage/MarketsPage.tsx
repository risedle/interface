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
        <div className="w-full h-full bg-gray-light-1 dark:bg-gray-dark-1 font-inter min-h-screen flex flex-col overflow-hidden">
            <Head>
                <title>Leveraged Tokens Market | Risedle</title>
                <meta name="description" content="Invest, earn and build on the decentralized leveraged token market protocol" />
            </Head>
            <Favicon />
            <div className="z-10">
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
            <div className="">
                <svg className="absolute top-0 z-10 z-0 absolute top-0 md:top-0 left-1/2 -translate-x-1/2 stroke-gray-light-12 dark:stroke-white max-w-screen-xl" width="100%" height="auto" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_924_31599)">
                        <rect x="205" y="221.087" width="14.5306" height="134.487" transform="rotate(-16.0921 205 221.087)" fill="#5FD4F4" />
                    </g>
                    <g filter="url(#filter1_f_924_31599)">
                        <rect x="323.65" y="179.715" width="14.5306" height="120.439" transform="rotate(-16.0921 323.65 179.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter2_f_924_31599)">
                        <rect x="290.865" y="179.715" width="14.5306" height="120.439" transform="rotate(-16.0921 290.865 179.715)" fill="#946800" />
                    </g>
                    <g filter="url(#filter3_f_924_31599)">
                        <rect x="448.544" y="156.297" width="14.5306" height="120.439" transform="rotate(-16.0921 448.544 156.297)" fill="#946800" />
                    </g>
                    <g filter="url(#filter4_f_924_31599)">
                        <rect x="363.46" y="205.475" width="14.5306" height="144.606" transform="rotate(-16.0921 363.46 205.475)" fill="#F4C6DB" />
                    </g>
                    <g filter="url(#filter5_f_924_31599)">
                        <rect x="215.148" y="143.028" width="14.5306" height="144.606" transform="rotate(-16.0921 215.148 143.028)" fill="#F4C6DB" />
                    </g>
                    <g opacity="0.5">
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                        <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                        <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                    </g>
                    <defs>
                        <filter id="filter0_f_924_31599" x="79.38" y="91.4391" width="302.479" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                        <filter id="filter1_f_924_31599" x="198.03" y="50.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                        <filter id="filter2_f_924_31599" x="165.245" y="50.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                        <filter id="filter3_f_924_31599" x="322.924" y="26.6495" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                        <filter id="filter4_f_924_31599" x="237.84" y="75.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                        <filter id="filter5_f_924_31599" x="89.5279" y="13.38" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_924_31599" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default MarketsPage;
