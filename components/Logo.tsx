import type { FunctionComponent } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

// Import SVG Logo
import RisedleLogo from "../public/logo.svg";

/**
 * LogoProps is a React Component properties that passed to React
 * Component Button
 */
type LogoProps = {};

/**
 * Logo is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Logo: FunctionComponent<LogoProps> = ({}) => {
    return (
        <Fragment>
            <Link href="/">
                <a className="inline-block transform active:scale-95 transition duration-300 ease-in-out">
                    <Image src={RisedleLogo} />
                </a>
            </Link>
        </Fragment>
    );
};

export default Logo;
