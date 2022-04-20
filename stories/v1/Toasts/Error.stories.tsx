import React from "react";

import ToastError from "../../../uikit/toasts/Error";

export default {
    component: ToastError,
    title: "Risedle V1/Toasts/Error",
};

export const Error = () => <ToastError>Transaction is rejected</ToastError>;
