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

const ButtonPrimary: FunctionComponent<ButtonPrimaryProps> = ({ onClick, full, children }) => {
    return (
        <button
            className={`button rounded-full border border-blue-light-11 bg-blue-light-10 py-[12px] px-[24px] text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-1 transition duration-300 ease-out hover:border-blue-light-10 hover:bg-blue-light-9 active:border-blue-light-9 active:bg-blue-light-8 dark:border-blue-dark-11 dark:bg-blue-dark-10 dark:text-blue-light-1 hover:dark:border-blue-dark-10 hover:dark:bg-blue-dark-9 active:dark:border-blue-dark-9 active:dark:bg-blue-dark-8 ${
                full ? "w-full" : ""
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
