import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonDisabledProps is a React Component properties that passed to React Component ButtonDisabled
 */
type ButtonDisabledProps = {
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonDisabled is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonDisabled: FunctionComponent<ButtonDisabledProps> = ({
    full,
    children
}) => {
    return(
        <button disabled className={`cursor-not-allowed bg-gray-light-4 dark:bg-gray-dark-4 border border-gray-light-5 dark:border-gray-dark-5 rounded-full text-sm leading-4 tracking-[-0.02em] text-gray-light-10 dark:text-gray-dark-10 font-semibold py-[12px] px-[24px] transition ease-out duration-300 ${full ? 'w-full' : ''}`}>
            {children}
        </button>
    )
}

export default ButtonDisabled;
