import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonSecondaryProps is a React Component properties that passed to React Component ButtonSecondary
 */
type ButtonSecondaryProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({
    onClick,
    full,
    children
}) => {
    return(
        <button className={`bg-blue-light-2 dark:bg-blue-dark-2 border border-blue-light-5 dark:border-blue-dark-5 rounded-full text-sm leading-4 tracking-[-0.02em] text-blue-light-11 dark:text-blue-dark-11 font-semibold py-[12px] px-[24px] transition ease-out duration-300 hover:bg-blue-light-3 hover:dark:bg-blue-dark-3 hover:border-blue-light-6 hover:dark:border-blue-dark-6 active:bg-blue-light-4 active:dark:bg-blue-dark-4 active:border-blue-light-7 active:dark:border-blue-dark-7 ${full ? 'w-full' : ''}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonSecondary;
