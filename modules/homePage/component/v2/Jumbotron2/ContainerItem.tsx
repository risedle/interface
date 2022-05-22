import { Props, useCallback, useEffect, useRef } from "react";
import { useJumbotronTwo } from "./Store";

type ContainerItem = {
    index: number;
    children?: React.ReactNode;
};

function ContainerItem({ children, index }: ContainerItem) {
    return <div className="h-screen snap-start snap-always">{children}</div>;
}

export { ContainerItem };
