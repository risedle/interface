import type { FunctionComponent } from "react";
/**
 * ButtonBlueProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonBlueProps = {
    onClick?: () => void;
};

/**
 * ButtonBlue is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonBlue: FunctionComponent<ButtonBlueProps> = ({ onClick, children }) => {
    const tailwind = ["text-white", "font-extrabold", "bg-blue", "px-6", "text-sm", "rounded-full", "hover:opacity-95", "transform active:scale-95", "transition duration-300 ease-in-out"];
    return (
        <button className={tailwind.join(" ")} onClick={onClick} style={{ lineHeight: "40px" }}>
            {children}
        </button>
    );
};

export default ButtonBlue;
