import React from "react";

import ButtonNetworkSwitcher from "../../../components/v1/Buttons/NetworkSwitcher";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ButtonNetworkSwitcher,
    title: "Risedle V1/Buttons/Network Switcher",
};

export const NetworkSwitcher = () => {
    return (
        <Wallet>
            <ButtonNetworkSwitcher />
        </Wallet>
    );
};
