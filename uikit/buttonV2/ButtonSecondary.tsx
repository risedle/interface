import { FunctionComponent } from "react";

/**
 * ButtonSecondaryProps is a React Component properties that passed to React Component ButtonSecondary
 */

type ButtonSecondaryProps = {
    onClick?: () => void;
    size: "md" | "lg" | "xl";
    type: "default" | "fab" | "square";
    disabled?: boolean;
};

/**
 * ButtonSecondary is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonSecondary: FunctionComponent<ButtonSecondaryProps> = ({ onClick, size, type, children, disabled }) => {
    let extraClass = "";
    switch (size) {
        case "md":
            extraClass = "px-4 h-10 heading-h7";
            break;
        case "lg":
            extraClass = "px-5 h-12 heading-h6";
            break;
        case "xl":
            extraClass = "px-6 h-16 heading-h6";
            break;
    }
    return (
        <button className={`flex flex-row items-center justify-center gap-2 active:scale-90 ${extraClass} bg-light-neutral-subtle/10 py-3 text-dark-neutral-primary transition ease-out ${type == "square" ? "rounded-lg" : "rounded-full"} ${disabled ? "opacity-40" : "hover:bg-light-neutral-subtle/20"}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default ButtonSecondary;
