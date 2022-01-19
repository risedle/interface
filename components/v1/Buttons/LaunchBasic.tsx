import type { FunctionComponent } from "react";
import Link from "next/link";

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
            <a className="text-gray-light-12 dark:text-gray-dark-12 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-5 dark:border-gray-dark-5 font-inter text-sm font-semibold py-3 px-4 rounded-full leading-none inline-block">Launch Markets</a>
        </Link>
    );
};

export default ButtonLaunchBasic;
