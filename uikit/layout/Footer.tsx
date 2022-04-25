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
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block stroke-gray-light-12 dark:stroke-gray-dark-12">
                        <g clipPath="url(#clip0_2255_108833)">
                            <path
                                d="M6.74918 11.1093C6.98355 11.1093 7.19449 11.2968 7.19449 11.5547C7.19449 11.789 7.00699 12 6.74918 12C6.5148 12 6.30387 11.8125 6.30387 11.5547C6.30387 11.2968 6.5148 11.1093 6.74918 11.1093ZM13.6398 8.39059C13.4054 8.39059 13.1945 8.20309 13.1945 7.94528C13.1945 7.7109 13.382 7.49996 13.6398 7.49996C13.8742 7.49996 14.0851 7.68746 14.0851 7.94528C14.0851 8.17965 13.8742 8.39059 13.6398 8.39059ZM13.6398 6.5859C12.8898 6.5859 12.2804 7.19528 12.2804 7.94528C12.2804 8.0859 12.3039 8.22653 12.3507 8.36715L7.87418 10.7578C7.61637 10.3828 7.19449 10.1718 6.74918 10.1718C6.23355 10.1718 5.7648 10.4765 5.53043 10.9218L1.49918 8.81246C1.0773 8.57809 0.749178 7.8984 0.796053 7.24215C0.819491 6.91403 0.936678 6.65621 1.10074 6.56246C1.21793 6.49215 1.33512 6.51559 1.49918 6.5859L1.52262 6.60934C2.60074 7.17184 6.09293 8.99996 6.23355 9.07028C6.46793 9.16403 6.58512 9.2109 6.98355 9.0234L14.2023 5.2734C14.3195 5.22653 14.4367 5.13278 14.4367 4.96871C14.4367 4.75778 14.2257 4.66403 14.2257 4.66403C13.8039 4.47653 13.1711 4.17184 12.5617 3.89059C11.2492 3.28121 9.74918 2.57809 9.09293 2.22653C8.53043 1.92184 8.06168 2.17965 7.99137 2.22653L7.8273 2.29684C4.85074 3.79684 0.913241 5.74215 0.678866 5.88278C0.280428 6.11715 0.0226158 6.60934 -0.000821666 7.21871C-0.0476967 8.17965 0.444491 9.18746 1.14762 9.53903L5.41324 11.7422C5.50699 12.3984 6.09293 12.914 6.74918 12.914C7.49918 12.914 8.08512 12.3281 8.10855 11.5781L12.7961 9.04684C13.0304 9.23434 13.3351 9.32809 13.6398 9.32809C14.3898 9.32809 14.9992 8.71871 14.9992 7.96871C14.9992 7.19528 14.3898 6.5859 13.6398 6.5859Z"
                                fill="#171717"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2255_108833">
                                <rect width="15" height="15" fill="none" />
                            </clipPath>
                        </defs>
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
