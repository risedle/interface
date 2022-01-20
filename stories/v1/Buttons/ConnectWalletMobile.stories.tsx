import React from "react";

import ButtonConnectWalletMobile from "../../../components/v1/Buttons/ConnectWalletMobile";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ButtonConnectWalletMobile,
    title: "Risedle V1/Buttons/Connect Wallet Mobile",
};

export const ConnectWalletMobile = () => {
    return (
        <Wallet>
            <ButtonConnectWalletMobile />
        </Wallet>
    );
};
