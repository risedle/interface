import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

/**
 * ButtonLoadingProps is a React Component properties that passed to React Component ButtonLoading
 */
type ButtonLoadingProps = {
    full?: boolean; // if full is true, then the button will have w-full class
};

/**
 * ButtonLoading is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const ButtonLoading: FunctionComponent<ButtonLoadingProps> = ({ full, children }) => {
    return (
        <button onClick={(e) => e.preventDefault()} className={`inline-block flex cursor-wait flex-row justify-center space-x-2 rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-center text-sm font-semibold leading-4 leading-4 tracking-[-0.02em] text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1 ${full ? "w-full" : ""}  drop-shadow-[0_0_45px_rgba(54,158,255,0.1)]`}>
            <svg width="17" height="16" viewBox="0 0 17 16" className="animate-spin fill-gray-light-12 dark:fill-gray-dark-12" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1161_30088)">
                    <path opacity="0.2" d="M16.5 8.00049C16.5 12.4188 12.9183 16.0005 8.5 16.0005C4.08172 16.0005 0.5 12.4188 0.5 8.00049C0.5 3.58221 4.08172 0.000488281 8.5 0.000488281C12.9183 0.000488281 16.5 3.58221 16.5 8.00049ZM2.9 8.00049C2.9 11.0933 5.40721 13.6005 8.5 13.6005C11.5928 13.6005 14.1 11.0933 14.1 8.00049C14.1 4.90769 11.5928 2.40049 8.5 2.40049C5.40721 2.40049 2.9 4.90769 2.9 8.00049Z" />
                    <path d="M15.3 8.00049C15.9627 8.00049 16.5092 8.5407 16.4102 9.196C16.3136 9.83526 16.1396 10.4619 15.891 11.062C15.489 12.0326 14.8997 12.9145 14.1569 13.6573C13.414 14.4002 12.5321 14.9895 11.5615 15.3915C10.9614 15.6401 10.3348 15.814 9.69551 15.9107C9.04021 16.0097 8.5 15.4632 8.5 14.8005C8.5 14.1377 9.04326 13.6133 9.69084 13.4724C10.0157 13.4017 10.3344 13.3021 10.643 13.1742C11.3224 12.8928 11.9398 12.4803 12.4598 11.9603C12.9798 11.4403 13.3923 10.8229 13.6737 10.1435C13.8016 9.83489 13.9012 9.51619 13.9719 9.19133C14.1129 8.54375 14.6373 8.00049 15.3 8.00049Z" />
                </g>
            </svg>
            <div>{children}</div>
        </button>
    );
};

export default ButtonLoading;
