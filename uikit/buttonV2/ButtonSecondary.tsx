import { FunctionComponent } from "react";

/**
 * ButtonSecondaryProps is a React Component properties that passed to React Component ButtonSecondary
 */

type ButtonSecondaryProps = {
    onClick?: () => void;
    size: "md" | "lg" | "xl";
    type: "default" | "fab" | "square";
};

/**
 * ButtonSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, size, type, children }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = "px-4 heading-h7";
            break;
        case "lg":
            extraClass = "px-5 heading-h6";
            break;
        case "xl":
            extraClass = "px-6 heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-2 ${extraClass} bg-light-neutral-subtle/10 py-3 text-dark-neutral-primary ${type == "square" ? "rounded-lg" : "rounded-full"}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonSecondary;
