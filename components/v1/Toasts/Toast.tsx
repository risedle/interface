import React from "react";
import { ToastOption } from "../../../store/ToastStore";
import NewToastSuccess from "./NewToastSuccess";
import * as Toast from "@radix-ui/react-toast";

export function createRenderToast(options: ToastOption) {
    // TODO : will return spesific toast style and position
    return (
        <>
            <NewToastSuccess {...options} />
            <Toast.Viewport key={options.id} className={`h-100 w-200 fixed left-1/2 z-40 mb-4 -translate-x-1/2`} />
        </>
    );
}
