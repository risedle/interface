import type { FunctionComponent, ReactNode } from "react";

/**
 * ToastErrorProps is a React Component properties that passed to React Component ToastError
 */
type ToastErrorProps = {
    children: ReactNode;
};

/**
 * ToastError is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ToastError: FunctionComponent<ToastErrorProps> = ({ children }) => {
    return (
        <div className="inline-block flex max-w-max flex-row items-center rounded-full border border-red-light-10 bg-red-light-9 py-[3px] pl-[4px] pr-4 dark:border-red-dark-5 dark:bg-red-dark-2">
            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="31" height="31" rx="15.5" className="fill-red-light-10 dark:fill-red-dark-5" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.4454 9.10886C16.0188 8.39308 14.9822 8.39308 14.5556 9.10886L8.16167 19.8369C7.72466 20.5701 8.25299 21.5001 9.10657 21.5001H21.8944C22.748 21.5001 23.2763 20.5701 22.8393 19.8369L16.4454 9.10886ZM15.4146 9.62082C15.4534 9.55575 15.5476 9.55575 15.5864 9.62082L21.9803 20.3489C22.02 20.4155 21.972 20.5001 21.8944 20.5001H9.10657C9.02897 20.5001 8.98094 20.4155 9.02067 20.3489L15.4146 9.62082ZM14.8274 12.9862C14.8127 12.6043 15.1183 12.2867 15.5005 12.2867C15.8827 12.2867 16.1883 12.6043 16.1736 12.9862L16.0197 16.9871C16.009 17.2661 15.7797 17.4867 15.5005 17.4867C15.2213 17.4867 14.992 17.2661 14.9813 16.9871L14.8274 12.9862ZM16.2504 18.9761C16.2504 19.3903 15.9146 19.7261 15.5004 19.7261C15.0862 19.7261 14.7504 19.3903 14.7504 18.9761C14.7504 18.5619 15.0862 18.2261 15.5004 18.2261C15.9146 18.2261 16.2504 18.5619 16.2504 18.9761Z"
                    className="fill-red-light-1 dark:fill-red-dark-11"
                />
            </svg>

            <span className="ml-2 inline-block text-xs font-semibold leading-4 text-red-light-1 dark:text-red-dark-12">{children}</span>
        </div>
    );
};

export default ToastError;
