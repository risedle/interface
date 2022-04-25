import type { FunctionComponent, ReactNode } from "react";

/**
 * ToastSuccessProps is a React Component properties that passed to React Component ToastSuccess
 */
type ToastSuccessProps = {
    children: ReactNode;
};

/**
 * ToastSuccess is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ToastSuccess: FunctionComponent<ToastSuccessProps> = ({ children }) => {
    return (
        <div className="inline-block flex max-w-max flex-row items-center rounded-full border border-green-light-10 bg-green-light-9 py-[3px] pl-[4px] pr-4 dark:border-green-dark-5 dark:bg-green-dark-2">
            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="31" height="31" rx="15.5" className="fill-green-light-10 dark:fill-green-dark-5" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4998 9.37695C11.8421 9.37695 8.87695 12.3421 8.87695 15.9998C8.87695 19.6574 11.8421 22.6226 15.4998 22.6226C19.1574 22.6226 22.1226 19.6574 22.1226 15.9998C22.1226 12.3421 19.1574 9.37695 15.4998 9.37695ZM9.82695 15.9998C9.82695 12.8668 12.3668 10.327 15.4998 10.327C18.6328 10.327 21.1726 12.8668 21.1726 15.9998C21.1726 19.1328 18.6328 21.6726 15.4998 21.6726C12.3668 21.6726 9.82695 19.1328 9.82695 15.9998ZM18.1588 14.0377C18.3177 13.8118 18.2635 13.4999 18.0377 13.341C17.8118 13.1821 17.4999 13.2363 17.341 13.4622L14.5196 17.4715L13.3567 16.287C13.1632 16.0899 12.8467 16.087 12.6496 16.2805C12.4526 16.4739 12.4497 16.7905 12.6431 16.9876L14.2265 18.6002C14.3304 18.7061 14.476 18.7603 14.6239 18.7482C14.7718 18.7362 14.9067 18.659 14.9921 18.5377L18.1588 14.0377Z"
                    className="fill-green-light-1 dark:fill-green-dark-11"
                />
            </svg>

            <span className="ml-2 inline-block text-xs font-semibold leading-4 text-green-light-1 dark:text-green-dark-12">{children}</span>
        </div>
    );
};

export default ToastSuccess;
