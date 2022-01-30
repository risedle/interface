import type { FunctionComponent } from "react";
import Link from "next/link";

/**
 * ButtonGreyLinkProps is a React Component properties that passed to React
 * Component Button
 */
type ButtonGreyLinkProps = {
    title: string;
    url: string;
};

/**
 * ButtonGreyLink is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonGreyLink: FunctionComponent<ButtonGreyLinkProps> = ({ title, url }) => {
    const tailwind = ["text-grey", "font-extrabold", "bg-white", "bg-opacity-8", "px-6", "text-sm", "rounded-full", "transform active:scale-95", "transition duration-300 ease-in-out", "inline-block", "align-middle", "text-center"];
    return (
        <Link href={url}>
            <a className={tailwind.join(" ")} style={{ height: "40px", lineHeight: "40px" }} target="_blank">
                {title}
            </a>
        </Link>
    );
};

export default ButtonGreyLink;
