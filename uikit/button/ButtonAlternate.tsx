import { FunctionComponent } from "react";
import { cls } from "../../utils/classTrim";

/**
 * ButtonAlternateProps is a React Component properties that passed to React Component ButtonAlternate
 */
type ButtonAlternateProps = {
    onClick?: () => void;
    type: "arb" | "bsc";
    className?: string;
};

/**
 * ButtonAlternate is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonAlternate: FunctionComponent<ButtonAlternateProps> = ({ onClick, type, className, children }) => {
    const buttonClasses = {
        base: "button flex flex-row gap-2 rounded-full px-6 h-10 items-center justify-center font-inter text-sm font-semibold leading-4 tracking-[-0.02em] transition ease-out active:scale-90",
        type: {
            arb: "bg-violet-light-10 bg-violet-dark-10 text-violet-dark-12 hover:bg-violet-light-9 dark:hover:bg-violet-dark-9 border border-violet-light-11 dark:border-violet-dark-11 hover:border-violet-light-10 hover:dark:border-violet-dark-10",
            bsc: "bg-amber-light-8 bg-amber-dark-8 text-amber-light-1 hover:bg-amber-light-9 dark:hover:bg-amber-dark-9 border border-amber-light-7 dark:border-amber-dark-7 hover:border-amber-light-6 hover:dark:border-amber-dark-6",
        },
    };
    return (
        <button className={cls(`${buttonClasses.base} ${buttonClasses.type[type]} ${className || ""}`)} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonAlternate;
