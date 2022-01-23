import React from "react";

import ETHRISEPage from "../../../components/v1/MarketDetailPage/ETHRISEPage";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ETHRISEPage,
    title: "Risedle V1/Market Detail Page/ETHRISE Detail Page",
};

export const ETHRISEDetailPage = () => (
    <Wallet>
        <ETHRISEPage />
    </Wallet>
);
