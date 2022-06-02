import type { FunctionComponent } from "react";

/**
 * FormLoadingFailedProps is a React Component properties that passed to React Component FormLoadingFailed
 */
type FormLoadingFailedProps = {};

/**
 * FormLoadingFailed is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FormLoadingFailed: FunctionComponent<FormLoadingFailedProps> = ({}) => {
    return (
        <div className="mt-6">
            <div className="flex h-[16px] animate-pulse flex-row rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>

            <form className="mt-2 flex flex-col space-y-4">
                <div className="flex h-[64px] animate-pulse flex-row items-center justify-between rounded-[8px] bg-gray-light-3 p-4 dark:bg-gray-dark-3"></div>
                <div className="flex h-[16px] animate-pulse flex-row rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>
                <div className="h-[80px] border-b border-dashed border-gray-light-5 pt-4 pb-8 dark:border-gray-dark-5"></div>

                <button onClick={(e) => e.preventDefault()} className="inline-block flex w-full cursor-not-allowed flex-row items-center justify-center space-x-2 rounded-full border border-gray-light-4 bg-gray-light-2 py-[11px] px-4 text-center text-sm font-semibold leading-4 leading-4 tracking-[-0.02em] text-blue-dark-1 dark:border-gray-dark-4 dark:bg-gray-dark-2 dark:text-blue-light-1">
                    <span className="mr-2 inline-block h-[8px] w-[8px] rounded-full bg-red-light-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:bg-red-dark-10 dark:shadow-red-dark-10"></span>
                    <div>Failed to load data</div>
                </button>
            </form>
        </div>
    );
};

export default FormLoadingFailed;
