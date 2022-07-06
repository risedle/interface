import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * ButtonLaunchBasicProps is a React Component properties that passed to React Component ButtonLaunchBasic
 */
type ButtonLaunchBasicProps = {};

/**
 * ButtonLaunchBasic is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonLaunchBasic: FunctionComponent<ButtonLaunchBasicProps> = ({}) => {
    return (
        <Link href="/markets">
            <a className="button basic px-[24px] py-[12px]">
                <span className="mr-2 font-bold">&#8594;</span> Launch
            </a>
        </Link>
    );
};

export default ButtonLaunchBasic;
