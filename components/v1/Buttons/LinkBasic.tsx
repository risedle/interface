import Link from "next/link";
import type { FunctionComponent, ReactNode } from "react";

/**
 * ButtonLinkBasicProps is a React Component properties that passed to React Component ButtonLinkBasic
 */
type ButtonLinkBasicProps = {
    children: ReactNode;
    href: string;
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonLinkBasic is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonLinkBasic: FunctionComponent<ButtonLinkBasicProps> = ({ children, href, full }) => {
    return (
        <Link href={href}>
            <a className={`button basic ${full ? "w-full" : ""}`}>{children}</a>
        </Link>
    );
};

export default ButtonLinkBasic;
