import React from "react";

import MarketNavigation from "../../../components/v1/Navigation/MarketNavigation";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: MarketNavigation,
    title: "Risedle V1/Navigation/Market",
};

export const Market = () => {
    return (
        <Wallet>
            <MarketNavigation />
        </Wallet>
    );
};
