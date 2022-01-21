import Link from "next/link";
import type { FunctionComponent, ReactNode } from "react";

/**
 * ButtonLinkBasicProps is a React Component properties that passed to React Component ButtonLinkBasic
 */
type ButtonLinkBasicProps = {
    children: ReactNode;
    href: string;
};

/**
 * ButtonLinkBasic is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonLinkBasic: FunctionComponent<ButtonLinkBasicProps> = ({ children, href }) => {
    return (
        <Link href={href}>
            <a className="button basic">{children}</a>
        </Link>
    );
};

export default ButtonLinkBasic;
