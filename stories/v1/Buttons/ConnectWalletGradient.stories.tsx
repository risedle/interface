import React from "react";

import ButtonConnectWalletGradient from "../../../components/v1/Buttons/ConnectWalletGradient";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ButtonConnectWalletGradient,
    title: "Risedle V1/Buttons/Connect Wallet Gradient",
};

export const ConnectWalletGradient = () => {
    return (
        <Wallet>
            <ButtonConnectWalletGradient />
        </Wallet>
    );
};
