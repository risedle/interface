import { useTokenInfoStore } from "./TokenInfoStore";

function ContainerInfoItem({ children }: { children?: React.ReactNode }) {
    return <div>{children}</div>;
}

function ItemTitle({ children }: { children: React.ReactNode }) {
    return <p className="mb-2 text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{children}</p>;
}

function ItemInfo({ children }: { children: React.ReactNode }) {
    const { status } = useTokenInfoStore();
    switch (status) {
        case "loading":
            return <div className="h-4 w-[100px] animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>;
        case "loaded":
            return <div className="font-ibm text-xs font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{children}</div>;
        default:
            return null;
    }
}

export { ContainerInfoItem, ItemInfo, ItemTitle };
