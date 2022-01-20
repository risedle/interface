import React from "react";

import ButtonConnectWalletDesktop from "../../../components/v1/Buttons/ConnectWalletDesktop";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ButtonConnectWalletDesktop,
    title: "Risedle V1/Buttons/Connect Wallet Desktop",
};

export const ConnectWalletDesktop = () => {
    return (
        <Wallet>
            <ButtonConnectWalletDesktop />
        </Wallet>
    );
};
