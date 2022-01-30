import Link from "next/link";
import type { FunctionComponent } from "react";
import RisedleLinks from "../../utils/links";

/**
 * FooterProps is a React Component properties that passed to React Component Footer
 */
type FooterProps = {};

/**
 * Footer is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Footer: FunctionComponent<FooterProps> = ({}) => {
    return (
        <div className="flex w-full flex-col gap-4 border-t border-gray-light-3 py-4 dark:border-gray-dark-3 sm:flex-row">
            <div className="flex flex-col justify-center gap-4 px-4 text-sm sm:flex-row sm:items-center sm:self-center ">
                <Link href="/">
                    <a>
                        <span className="traking-tight font-inter text-gray-light-10 dark:text-gray-dark-10">Risedle Labs</span>
                    </a>
                </Link>
                <div className="flex items-center gap-2 text-gray-light-12 dark:text-gray-dark-12">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.25756 3.61684C3.67747 3.95796 3.83499 3.93193 4.62345 3.87933L12.0568 3.43299C12.2145 3.43299 12.0834 3.27571 12.0308 3.24957L10.7963 2.35711C10.5597 2.17347 10.2446 1.96315 9.64058 2.01576L2.44284 2.54074C2.18034 2.56677 2.1279 2.69801 2.23246 2.80322L3.25756 3.61684ZM3.70386 5.34917V13.1704C3.70386 13.5907 3.91391 13.748 4.38669 13.722L12.556 13.2493C13.029 13.2233 13.0816 12.9341 13.0816 12.5927V4.82397C13.0816 4.48306 12.9505 4.29921 12.661 4.32545L4.12398 4.82397C3.80894 4.85044 3.70386 5.00803 3.70386 5.34917ZM11.7685 5.76872C11.8209 6.00518 11.7685 6.24142 11.5317 6.26799L11.138 6.34641V12.1205C10.7963 12.3042 10.4811 12.4092 10.2185 12.4092C9.7981 12.4092 9.69281 12.2779 9.37788 11.8844L6.8032 7.84249V11.7532L7.61792 11.937C7.61792 11.937 7.61792 12.4092 6.96061 12.4092L5.14854 12.5143C5.0959 12.4092 5.14854 12.147 5.33234 12.0944L5.80521 11.9634V6.79276L5.14865 6.74015C5.09601 6.50369 5.22714 6.16278 5.59516 6.13631L7.53911 6.00528L10.2185 10.0998V6.47765L9.53539 6.39924C9.48296 6.11018 9.69281 5.90028 9.95551 5.87425L11.7685 5.76872ZM1.8385 1.83212L9.32533 1.28079C10.2447 1.20193 10.4813 1.25475 11.0591 1.67452L13.449 3.35424C13.8433 3.64309 13.9748 3.72173 13.9748 4.03661V13.2493C13.9748 13.8266 13.7644 14.1681 13.0291 14.2203L4.33468 14.7454C3.78267 14.7717 3.51995 14.693 3.23087 14.3253L1.47092 12.0419C1.15555 11.6216 1.02441 11.3071 1.02441 10.9392V2.75041C1.02441 2.27825 1.2348 1.88441 1.8385 1.83212Z"
                            fill="currentColor"
                        />
                    </svg>
                    <a href={RisedleLinks.docs} target="_blank" rel="noopener noreferrer">
                        Docs &#8599;
                    </a>
                </div>
            </div>
            <div className="mt-8 flex grow flex-col gap-y-4 px-4 sm:my-0 sm:flex-row sm:justify-end sm:gap-x-4">
                <Link href={RisedleLinks.twitter}>
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">Twitter &#8599;</a>
                </Link>
                <Link href={RisedleLinks.discord}>
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">Discord &#8599;</a>
                </Link>
                <Link href={RisedleLinks.github}>
                    <a className="text-sm text-gray-light-12 dark:text-gray-dark-12 sm:self-center">Github &#8599;</a>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
