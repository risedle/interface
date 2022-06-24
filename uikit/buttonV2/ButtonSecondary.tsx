import { FunctionComponent, ButtonHTMLAttributes } from "react";

/**
 * ButtonSecondaryProps is a React Component properties that passed to React Component ButtonSecondary
 */

type ButtonSecondaryProps = {
    size?: "md" | "lg" | "xl";
    type?: "default" | "fab" | "square";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "type">;

/**
 * ButtonSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, size = "md", type = "default", children, className, ...restProps }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = type == "fab" ? "w-10 h-10 heading-h7" : "px-4 h-10 heading-h7";
            break;
        case "lg":
            extraClass = type == "fab" ? "w-12 h-12 heading-h6" : "px-5 h-12 heading-h6";
            break;
        case "xl":
            extraClass = type == "fab" ? "w-16 h-16 heading-h6" : "px-6 h-16 heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-2 active:scale-90 ${extraClass} bg-light-neutral-subtle/10 py-3 text-dark-neutral-primary transition ease-out ${type == "square" ? "rounded-lg" : "rounded-full"} ${restProps.disabled ? "opacity-40" : "hover:bg-light-neutral-subtle/20"} ${className || ""}`} onClick={onClick} {...restProps}>
            {children}
        </button>
    );
};

export default ButtonSecondary;
