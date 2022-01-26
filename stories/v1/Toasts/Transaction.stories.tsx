import React from "react";

import ToastTransaction from "../../../components/v1/Toasts/Transaction";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: ToastTransaction,
    title: "Risedle V1/Toasts/Transaction",
};

export const Transaction = () => (
    <Wallet>
        <ToastTransaction hash="0x4bd32945f8d1ee82a24422074460b8e811b200eec1b0d6264e8fd171a0b50c89"></ToastTransaction>
    </Wallet>
);
