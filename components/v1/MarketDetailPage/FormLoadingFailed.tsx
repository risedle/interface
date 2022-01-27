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
            <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>

            <form className="flex flex-col mt-2 space-y-4">
                <div className="h-[64px] animate-pulse flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between"></div>
                <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>
                <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed h-[80px]"></div>

                <button onClick={(e) => e.preventDefault()} className="cursor-not-allowed flex flex-row text-center justify-center items-center space-x-2 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 text-blue-dark-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full">
                    <span className="w-[8px] h-[8px] rounded-full bg-red-light-10 dark:bg-red-dark-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:shadow-red-dark-10 inline-block mr-2"></span>
                    <div>Failed to load data</div>
                </button>
            </form>
        </div>
    );
};

export default FormLoadingFailed;
