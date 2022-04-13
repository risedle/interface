import React from "react";
import { ToastOption } from "../../../store/ToastStore";
import NewToastSuccess from "./NewToastSuccess";
import * as Toast from "@radix-ui/react-toast";
import { id } from "ethers/lib/utils";

export function createRenderToast(options: ToastOption) {
    // will return spesific toast style and position
    return (
        <>
            <NewToastSuccess {...options} />
            <Toast.Viewport className="h-100 w-200 fixed left-1/2  z-40 mb-4 -translate-x-1/2" />
        </>
    );
}
