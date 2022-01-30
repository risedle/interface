import type { FunctionComponent } from "react";
/**
 * ButtonBlueSecondaryProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonBlueSecondaryProps = {
    onClick?: () => void;
};

/**
 * ButtonBlueSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonBlueSecondary: FunctionComponent<ButtonBlueSecondaryProps> = ({ onClick, children }) => {
    const tailwind = ["text-blue", "font-extrabold", "bg-blue", "bg-opacity-15", "px-6", "text-sm", "rounded-full", "hover:opacity-95", "transform active:scale-95", "transition duration-300 ease-in-out"];
    return (
        <button className={tailwind.join(" ")} onClick={onClick} style={{ lineHeight: "40px" }}>
            {children}
        </button>
    );
};

export default ButtonBlueSecondary;
