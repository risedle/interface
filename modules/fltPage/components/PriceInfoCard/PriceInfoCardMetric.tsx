import type { FunctionComponent } from "react";
import { dollarFormatter } from "../../../../utils/formatters";

/**
 * PriceInfoCardMetricProps is a React Component properties that passed to React Component PriceInfoCardMetric
 */
type PriceInfoCardMetricProps = {
    price: number;
    priceChange: number;
    priceChangePercentage: number;
};

/**
 * PriceInfoCardMetric is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const PriceInfoCardMetric: FunctionComponent<PriceInfoCardMetricProps> = ({ price, priceChange, priceChangePercentage }) => {
    return (
        <div className="flex gap-4 px-4">
            {/* Price */}
            <div className="flex flex-col gap-2">
                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Price</p>
                <p className="font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12">{dollarFormatter.format(price)}</p>
            </div>

            {/* Changes */}
            <div className="flex flex-col gap-2">
                <p className="text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">Changes</p>
                <p className={`flex items-center gap-1 font-ibm text-sm font-semibold leading-4 tracking-[-0.02em] ${priceChange > 0 ? "text-green-light-11 dark:text-green-dark-11" : "text-red-light-11 dark:text-red-dark-11"}`}>
                    {priceChange > 0 ? <span>&uarr;</span> : <span>&darr;</span>} {dollarFormatter.format(priceChange)} ({priceChangePercentage.toFixed(2) + "%"})
                </p>
            </div>
        </div>
    );
};

export default PriceInfoCardMetric;
