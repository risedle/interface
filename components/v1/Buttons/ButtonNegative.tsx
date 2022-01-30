import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonNegativeProps is a React Component properties that passed to React Component ButtonNegative
 */
type ButtonNegativeProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonNegative is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonNegative: FunctionComponent<ButtonNegativeProps> = ({ onClick, full, children }) => {
    return (
        <button
            className={`button rounded-full border border-red-light-11 bg-red-light-10 py-[12px] px-[24px] text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-1 transition duration-300 ease-out hover:border-red-light-10 hover:bg-red-light-9 active:border-red-light-9 active:bg-red-light-8 dark:border-red-dark-11 dark:bg-red-dark-10 dark:text-blue-light-1 hover:dark:border-red-dark-10 hover:dark:bg-red-dark-9 active:dark:border-red-dark-9 active:dark:bg-red-dark-8 ${
                full ? "w-full" : ""
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonNegative;
