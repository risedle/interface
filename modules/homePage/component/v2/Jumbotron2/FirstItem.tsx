import React, { useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { ContainerItem } from "./ContainerItem";

export default function FirstItem() {
    return (
        <ContainerItem index={0}>
            <p className="text-5xl font-extrabold text-gray-200">Boost Any Token And Earn More</p>
        </ContainerItem>
    );
}
