import React from "react";

import PriceChart from "../../components/v1/PriceChart";
export default {
    component: PriceChart,
    title: "Risedle V1/Charts/Leveraged Tokens Price Chart",
};

export const LeveragedTokensPriceChart = () => (
    <div style={{ width: "400px", height: "200px" }}>
        <PriceChart leveragedTokenAddress="0xc4676f88663360155c2bc6d2A482E34121a50b3b" />
    </div>
);
