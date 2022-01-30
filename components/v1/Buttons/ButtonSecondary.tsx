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

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, full, children }) => {
    return (
        <button
            className={`button rounded-full border border-blue-light-5 bg-blue-light-2 py-[12px] px-[24px] text-sm font-semibold leading-4 tracking-[-0.02em] text-blue-light-11 transition duration-300 ease-out hover:border-blue-light-6 hover:bg-blue-light-3 active:border-blue-light-7 active:bg-blue-light-4 dark:border-blue-dark-5 dark:bg-blue-dark-2 dark:text-blue-dark-11 hover:dark:border-blue-dark-6 hover:dark:bg-blue-dark-3 active:dark:border-blue-dark-7 active:dark:bg-blue-dark-4 ${
                full ? "w-full" : ""
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonSecondary;
