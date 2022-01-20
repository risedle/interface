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
const ETFCard: FunctionComponent<ETFCardProps> = ({
    title,
    subTitle,
    etfURL,
    navPrice,
    change30d,
}) => {
    return (
        <div
            className="flex flex-col bg-gradient-to-t from-grey-100 rounded-2xl p-6 gap gap-y-4 mx-auto"
            style={{ width: "480px" }}
        >
            <div className="flex flex-row">
                <div className="flex-grow">
                    <h3 className="text-white font-extrabold text-xl leading-normal">
                        {title}
                    </h3>
                    <p className="m-0 text-grey font-semibold text-base leading-normal">
                        {subTitle}
                    </p>
                </div>

                <div className="flex-none">
                    <ButtonBlueLink title="Invest" url={etfURL} />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex-1">
                    <p className="m-0 text-grey font-semibold leading-normal text-m">
                        NAV
                    </p>
                    <p className="m-0 text-white font-extrabold text-base leading-normal">
                        {navPrice}
                    </p>
                </div>
                <div className="flex-1">
                    <p className="m-0 text-grey font-semibold leading-normal text-sm">
                        30d change
                    </p>
                    <p className="m-0 text-white font-extrabold text-base leading-normal">
                        {change30d}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ETFCard;
