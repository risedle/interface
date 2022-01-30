import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonSpecialsProps is a React Component properties that passed to React Component ButtonSpecials
 */
type ButtonSpecialsProps = {
    onClick?: () => void;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonSpecials is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSpecials: FunctionComponent<ButtonSpecialsProps> = ({ onClick, full, children }) => {
    return (
        <button className={`button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-[12px] px-[24px] text-sm font-semibold leading-4 tracking-[-0.02em] tracking-tight text-gray-light-1 hover:bg-left hover:shadow-xl hover:shadow-blue-400/20 dark:text-gray-dark-1 ${full ? "w-full" : ""}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonSpecials;
