import type { FunctionComponent } from "react";
import ButtonBlueLink from "./ButtonBlueLink";

/**
 * ETFCardProps is a React Component properties that passed to React
 * Component Button
 */
type ETFCardProps = {
    title: string;
    subTitle: string;
    etfURL: string;
    navPrice: string;
    change30d: string;
};

/**
 * ETFCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ETFCard: FunctionComponent<ETFCardProps> = ({ title, subTitle, etfURL, navPrice, change30d }) => {
    return (
        <div className="gap mx-auto flex flex-col gap-y-4 rounded-2xl bg-gradient-to-t from-grey-100 p-6" style={{ width: "480px" }}>
            <div className="flex flex-row">
                <div className="flex-grow">
                    <h3 className="text-xl font-extrabold leading-normal text-white">{title}</h3>
                    <p className="m-0 text-base font-semibold leading-normal text-grey">{subTitle}</p>
                </div>

                <div className="flex-none">
                    <ButtonBlueLink title="Invest" url={etfURL} />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex-1">
                    <p className="text-m m-0 font-semibold leading-normal text-grey">NAV</p>
                    <p className="m-0 text-base font-extrabold leading-normal text-white">{navPrice}</p>
                </div>
                <div className="flex-1">
                    <p className="m-0 text-sm font-semibold leading-normal text-grey">30d change</p>
                    <p className="m-0 text-base font-extrabold leading-normal text-white">{change30d}</p>
                </div>
            </div>
        </div>
    );
};

export default ETFCard;
