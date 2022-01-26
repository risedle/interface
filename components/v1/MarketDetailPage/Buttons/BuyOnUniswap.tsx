import type { FunctionComponent } from "react";
import Link from "next/link";

/**
 * ButtonBuyOnUniswapProps is a React Component properties that passed to React Component ButtonBuyOnUniswap
 */
type ButtonBuyOnUniswapProps = {
    href: string;
};

/**
 * ButtonBuyOnUniswap is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonBuyOnUniswap: FunctionComponent<ButtonBuyOnUniswapProps> = ({ href }) => {
    return (
        <Link href={href}>
            <a className="flex flex-row text-center justify-center items-center space-x-2 bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 text-gray-light-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full">Buy on Uniswap</a>
        </Link>
    );
};

export default ButtonBuyOnUniswap;
