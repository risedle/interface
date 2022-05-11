import { FunctionComponent } from "react";
import LeveragedTokenChart from "./LeveragedTokenChart";
import InformationCard from "../../../uikit/card/InformationCard";

/**
 * PriceInfoCardProps is a React Component properties that passed to React Component PriceInfoCard
 */
type PriceInfoCardProps = {
    title: string;
    subtitle: string;
    logo: string;
    tokenAddress: string;
};

/**
 * PriceInfoCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceInfoCard: FunctionComponent<PriceInfoCardProps> = ({ title, subtitle, logo, tokenAddress }) => {
    return (
        <div className="max-w-[540px]">
            <InformationCard className="space-y-0 px-0 pb-0">
                <div className="flex flex-row items-center justify-between p-4">
                    <div className="flex grow flex-col space-y-2">
                        <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{subtitle}</p>
                        <h1 className="m-0 text-2xl font-bold tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{title}</h1>
                    </div>
                    <img className="h-[48px] w-[48px]" src={logo} alt={title} />
                </div>
                <LeveragedTokenChart address={tokenAddress} />
            </InformationCard>
        </div>
    );
};

export default PriceInfoCard;
