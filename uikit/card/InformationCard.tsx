import type { FunctionComponent, ReactNode } from "react";

type InformationCardProps = {
    children: ReactNode;
    className?: string;
};

const InformationCard: FunctionComponent<InformationCardProps> = ({ children, className }) => {
    return <div className={`flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pt-4 pb-4 dark:bg-gray-dark-2 ${className || ""}`}>{children}</div>;
};

const InformationCardTitle = ({ children }: { children: ReactNode }) => {
    return <h2 className="text-base font-bold leading-4 text-gray-light-12 dark:text-gray-dark-12">{children}</h2>;
};

const InformationCardSubTitle = ({ children }: { children: ReactNode }) => {
    // TODO: elipsis on overflow
    return <p className="text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">{children}</p>;
};

const InformationCardExtra = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10${className || ""}`}>{children}</div>;
};

export { InformationCardTitle, InformationCardSubTitle, InformationCardExtra, InformationCard };
