import type { FunctionComponent } from "react";
/**
 * ButtonOutlineProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonOutlineProps = {
    onClick?: () => void;
    active?: boolean | undefined;
};

/**
 * ButtonOutline is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonOutline: FunctionComponent<ButtonOutlineProps> = ({ onClick, children, active }) => {
    const tailwind = ["text-white", "font-extrabold", "px-6", "text-sm", "rounded-full", "hover:opacity-95", "transform active:scale-95", "transition duration-300 ease-in-out", "border border-opacity-20 border-white", "hover:border-opacity-30"];

    const tailwindActive = ["text-white", "font-extrabold", "px-6", "text-sm", "rounded-full", "transform active:scale-95", "transition duration-300 ease-in-out", "border border-opacity-50 border-white"];

    return (
        <button className={active ? tailwindActive.join(" ") : tailwind.join(" ")} onClick={onClick} style={{ lineHeight: "38px" }}>
            {children}
        </button>
    );
};

export default ButtonOutline;
