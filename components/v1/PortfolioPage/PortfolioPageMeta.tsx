import type { FunctionComponent } from "react";

/**
 * PortofolioPageMetaProps is a React Component properties that passed to React Component PortofolioPageMeta
 */
type PortofolioPageMetaProps = {};

/**
 * PortofolioPageMeta is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const PortofolioPageMeta: FunctionComponent<PortofolioPageMetaProps> = ({}) => {
    return (
        <>
            {/* 
                This component is reusable to generate og metadata for each ETF asset available.
                Note: The description is currently hard coded and will be changed when a new ETF available
             */}

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://risedle.com/portfolio" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Risedle Protocol" />
            <meta property="og:description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            <meta property="og:image" content="https://risedle.com/assets/images/og/Portfolio.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="risedle.com" />
            <meta property="twitter:url" content="https://risedle.com/portofolio" />
            <meta name="twitter:title" content="Risedle Protocol" />
            <meta name="twitter:description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            <meta name="twitter:image" content="https://risedle.com/assets/images/og/Portfolio.png" />
        </>
    );
};

export default PortofolioPageMeta;
