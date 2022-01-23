import React from "react";

import PriceChart from "../../../components/v1/MarketDetailPage/PriceChart";

export default {
    component: PriceChart,
    title: "Risedle V1/Market Detail Page/Price Chart Component",
};

export const PriceChartComponent = () => <PriceChart leveragedTokenAddress="0xc4676f88663360155c2bc6d2A482E34121a50b3b" title="ETHRISE" subtitle="ETH Leverage Market" logo="/markets/ethrise.svg" totalCollateral={10} maxTotalCollateral={20} uniswapURL="#" mintTokenSymbol="ETH" mintTokenBalance={1} redeemTokenSymbol="ETHRISE" redeemTokenBalance={20} />;
export const PriceChartComponentMaxedOut = () => <PriceChart leveragedTokenAddress="0xc4676f88663360155c2bc6d2A482E34121a50b3b" title="ETHRISE" subtitle="ETH Leverage Market" logo="/markets/ethrise.svg" totalCollateral={10} maxTotalCollateral={10} uniswapURL="#" mintTokenSymbol="ETH" mintTokenBalance={1} redeemTokenSymbol="ETHRISE" redeemTokenBalance={20} />;
