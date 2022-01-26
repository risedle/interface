import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonPositiveProps is a React Component properties that passed to React Component ButtonPositive
 */
type ButtonPositiveProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonPositive is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonPositive: FunctionComponent<ButtonPositiveProps> = ({
    onClick,
    full,
    children
}) => {
    return(
        <button className={`bg-green-light-10 dark:bg-green-dark-10 border border-green-light-11 dark:border-green-dark-11 rounded-full text-sm leading-4 tracking-[-0.02em] text-gray-light-1 dark:text-blue-light-1 font-semibold py-[12px] px-[24px] transition ease-out duration-300 hover:bg-green-light-9 hover:dark:bg-green-dark-9 hover:border-green-light-10 hover:dark:border-green-dark-10 active:bg-green-light-8 active:dark:bg-green-dark-8 active:border-green-light-9 active:dark:border-green-dark-9 ${full ? 'w-full' : ''}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonPositive;
