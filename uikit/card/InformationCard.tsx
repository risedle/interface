import type { FunctionComponent, ReactNode } from "react";

/**
 * InformationCardProps is a React Component properties that passed to React Component InformationCard
 */
type InformationCardProps = {
    children: ReactNode;
    className?: string;
};

/**
 * InformationCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const InformationCard: FunctionComponent<InformationCardProps> = ({ children, className }) => {
    return <div className={`flex w-full flex-col space-y-6 rounded-[16px] bg-gray-light-2 px-4 pb-4 dark:bg-gray-dark-2 ` + className}>{children}</div>;
};

export default InformationCard;
