import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonDisabledProps is a React Component properties that passed to React Component ButtonDisabled
 */
type ButtonDisabledProps = {
    full?: boolean; // if full is true, then the button will have w-full class
    children: ReactNode;
};

/**
 * ButtonDisabled is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonDisabled: FunctionComponent<ButtonDisabledProps> = ({ full, children }) => {
    return (
        <button disabled className={`button cursor-not-allowed rounded-full border border-gray-light-5 bg-gray-light-4 py-[11px] px-[24px] text-sm font-semibold leading-4 tracking-[-0.02em] text-gray-light-10 transition duration-300 ease-out dark:border-gray-dark-5 dark:bg-gray-dark-4 dark:text-gray-dark-10 ${full ? "w-full" : ""}`}>
            {children}
        </button>
    );
};

export default ButtonDisabled;
