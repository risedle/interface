import React from "react";

import Header from "../../../components/v1/MarketsPage/Header";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: Header,
    title: "Risedle V1/Markets Page/Markets Page Header",
};

export const MarketsPageHeader = () => {
    return (
        <Wallet>
            <Header />
        </Wallet>
    );
};
