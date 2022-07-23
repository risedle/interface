import React, { HTMLProps, useMemo } from "react";
import { useViewportSize } from "../../hooks/useViewportSize";
import { getChainColors } from "../../utils/getChainColor";
import BSCFlatIcon from "../icon/BSCFlatIcon";

const styles = {
    textContainer: ["flex", "flex-row", "items-center", "gap-1", "px-8"].join(" "),
    content: ["flex", "flex-row", "divide-x", "dark:divide-amber-dark-11/10", "divide-amber-light-11/10"].join(" "),
    contentContainer: ["flex", "flex-row", "border-b", "border-gray-light-4", "dark:border-gray-dark-4", "w-max", "divide-x"].join(" "),
    textBase: ["font-semibold", "text-xs", "tracking-tight"].join(" "),
    textBaseColor: ["text-gray-light-11", "dark:text-gray-dark-11", "fill-gray-light-11", "dark:fill-gray-dark-11"].join(" "),
};

type BannerContentContainer = {
    children: React.ReactNode;
} & HTMLProps<HTMLDivElement>;

function BannerContentContainer({ children, ...props }: BannerContentContainer) {
    const chainColors = getChainColors(56);

    return (
        <div {...props} className={styles.content}>
            {children}
        </div>
    );
}

type VariantBannerContent = "chain" | "base";

type BannerContentProps = {
    variant: VariantBannerContent;
    children?: React.ReactNode;
    isIcon?: boolean;
    chainId?: number;
};

function BannerContent({ children }: { children: React.ReactNode }) {
    return <div className={styles.textContainer}>{children}</div>;
}

function CloseBannerButton({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="absolute top-0 right-0 flex h-[45px] w-[120px] items-center justify-end bg-gradient-to-r from-transparent to-gray-light-1 px-4 text-gray-light-11 dark:to-gray-dark-1 dark:text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
    );
}

function BannerItem({ variant = "base", children, isIcon = false, chainId }: BannerContentProps) {
    const chainColors = getChainColors(chainId);
    const color = useMemo(() => {
        switch (variant) {
            case "base":
                return styles.textBaseColor;
            case "chain":
                return chainColors;
        }
    }, [variant, chainColors]);
    if (isIcon) {
        return <BSCFlatIcon className={`${styles.textBase} ${color}`} />;
    }
    return <div className={`${styles.textBase} ${color}`}>{children}</div>;
}

function Banner({ children, chainId }: { children: React.ReactNode; chainId: number }) {
    const chainColors = getChainColors(chainId);

    // Fill the current windown
    const dim = useViewportSize();
    const contentAmount = Math.round(dim.width / 350) + 1;
    return (
        <div data-testid="WarningBar" className={`${styles.contentContainer} ${chainColors} bg-gray-light-1/90 px-4 py-3 backdrop-blur-lg dark:bg-gray-dark-1/90`}>
            {Array.from(Array(contentAmount), (e, i) => {
                return children;
            })}
        </div>
    );
}

export { Banner, BannerContentContainer, BannerItem, BannerContent, CloseBannerButton };
