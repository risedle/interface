import React from "react";

import ToastInProgress from "../../../components/v1/Toasts/InProgress";

export default {
    component: ToastInProgress,
    title: "Risedle V1/Toasts/InProgress",
};

export const InProgress = () => (
    <ToastInProgress>Undergoing transaction 0xb5c8...9838</ToastInProgress>
);
