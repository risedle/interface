import React from "react";

import Navigation from "../../../components/v1/MarketsPage/Navigation";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: Navigation,
    title: "Risedle V1/Markets Page/Market Navigation",
};

export const MarketNavigation = () => {
    return (
        <Wallet>
            <Navigation />
        </Wallet>
    );
};
