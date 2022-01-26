import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonPrimaryProps is a React Component properties that passed to React Component ButtonPrimary
 */
type ButtonPrimaryProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonPrimary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonPrimary: FunctionComponent<ButtonPrimaryProps> = ({
    onClick,
    full,
    children
}) => {
    return(
        <button className={`bg-blue-light-10 dark:bg-blue-dark-10 border border-blue-light-11 dark:border-blue-dark-11 rounded-full text-sm leading-4 tracking-[-0.02em] text-gray-light-1 dark:text-blue-light-1 font-semibold py-[12px] px-[24px] transition ease-out duration-300 hover:bg-blue-light-9 hover:dark:bg-blue-dark-9 hover:border-blue-light-10 hover:dark:border-blue-dark-10 active:bg-blue-light-8 active:dark:bg-blue-dark-8 active:border-blue-light-9 active:dark:border-blue-dark-9 ${full ? 'w-full' : ''}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonPrimary;
