import type { FunctionComponent } from "react";

/**
 * MarketDetailPageProps is a React Component properties that passed to React Component MarketDetailPage
 */
type MarketDetailPageProps = {
    title: string;
    path: string;
};

/**
 * MarketDetailPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const MarketDetailPage: FunctionComponent<MarketDetailPageProps> = ({ title, path }) => {
    return (
        <>
            {/* 
                This component is reusable to generate og metadata for each ETF asset available.
                Note: The description is currently hard coded and will be changed when a new ETF available
             */}

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content={`https://risedle.com${path}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${title} Market | Risedle Protocol`} />
            <meta property="og:description" content="Leverage ETH or earn yield from your idle USDC" />
            <meta property="og:image" content={`https://risedle.com/og/${title}.png`} />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="risedle.com" />
            <meta property="twitter:url" content={`https://risedle.com${path}`} />
            <meta name="twitter:title" content={`${title} Market | Risedle Protocol`} />
            <meta name="twitter:description" content="Leverage ETH or earn yield from your idle USDC" />
            <meta name="twitter:image" content={`https://risedle.com/og/${title}.png`} />
        </>
    );
};

export default MarketDetailPage;
