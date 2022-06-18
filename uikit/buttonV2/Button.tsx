import { FunctionComponent, ButtonHTMLAttributes } from "react";
import ButtonPrimary from "./ButtonPrimary";

type ButtonPrimaryProps = {
    size?: "md" | "lg" | "xl";
    type?: "fab" | "default";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "type">;

const buttonClasses = {
    base: "flex flex-row items-center justify-center gap-2 active:scale-90 transition ease-out",
    disabled: "bg-dark-neutral-primary opacity-40 cursor-not-allowed",
    size: {
        md: {
            fab: "w-10 h-10 heading-h7",
            default: "px-4 h-10 heading-h7",
        },
        lg: {
            fab: "w-12 h-12 heading-h6",
            default: "px-5 h-12 heading-h6",
        },
        xl: {
            fab: "w-16 h-16 heading-h6",
            default: "px-6 h-16 heading-h6",
        },
    },
    type: {
        fab: "rounded-lg",
        default: "rounded-full",
    },
    variant: {
        primary: "bg-dark-neutral-primary text-dark-background-default hover:bg-dark-neutral-soft",
        secondary: "bg-light-neutral-subtle/10 py-3 text-dark-neutral-primary hover:bg-light-neutral-subtle/20",
    },
};

const Button: FunctionComponent<ButtonPrimaryProps> = ({ size = "md", type = "fab", disabled = false, children, className, ...restProps }) => {
    return (
        <button
            className={`
        ${buttonClasses.base}
        ${buttonClasses.size[size][type]}
        ${buttonClasses.type[type]}
        ${disabled && buttonClasses.disabled}
        ${className || ""}
        `}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;
