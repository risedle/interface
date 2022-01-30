import type { FunctionComponent, ReactNode } from "react";

/**
 * ToastInProgressProps is a React Component properties that passed to React Component ToastInProgress
 */
type ToastInProgressProps = {
    children: ReactNode;
};

/**
 * ToastInProgress is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ToastInProgress: FunctionComponent<ToastInProgressProps> = ({ children }) => {
    return (
        <div className="inline-block flex max-w-max flex-row items-center rounded-full border border-green-light-10 bg-green-light-9 py-[3px] pl-[4px] pr-4 dark:border-green-dark-5 dark:bg-green-dark-2">
            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <rect y="0.5" width="31" height="31" rx="15.5" className="fill-green-light-10 dark:fill-green-dark-5" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.625 16C11.625 16.6213 11.1213 17.125 10.5 17.125C9.87868 17.125 9.375 16.6213 9.375 16C9.375 15.3787 9.87868 14.875 10.5 14.875C11.1213 14.875 11.625 15.3787 11.625 16ZM16.625 16C16.625 16.6213 16.1213 17.125 15.5 17.125C14.8787 17.125 14.375 16.6213 14.375 16C14.375 15.3787 14.8787 14.875 15.5 14.875C16.1213 14.875 16.625 15.3787 16.625 16ZM20.5 17.125C21.1213 17.125 21.625 16.6213 21.625 16C21.625 15.3787 21.1213 14.875 20.5 14.875C19.8787 14.875 19.375 15.3787 19.375 16C19.375 16.6213 19.8787 17.125 20.5 17.125Z"
                    className="fill-green-light-1 dark:fill-green-dark-11 "
                />
            </svg>

            <span className="ml-2 inline-block text-xs font-semibold leading-4 text-green-light-1 dark:text-green-dark-12">{children}</span>
        </div>
    );
};

export default ToastInProgress;
