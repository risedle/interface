import React from "react";

import MarketCards from "../../../components/v1/MarketsPage/MarketCards";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: MarketCards,
    title: "Risedle V1/Markets Page/Cards",
};

export const Cards = () => {
    return (
        <Wallet>
            <MarketCards />
        </Wallet>
    );
};
