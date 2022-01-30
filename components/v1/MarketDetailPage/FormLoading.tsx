import type { FunctionComponent } from "react";
import ButtonLoading from "../Buttons/ButtonLoading";

/**
 * FormLoadingProps is a React Component properties that passed to React Component FormLoading
 */
type FormLoadingProps = {};

/**
 * FormLoading is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FormLoading: FunctionComponent<FormLoadingProps> = ({}) => {
    return (
        <div className="mt-6">
            <div className="flex h-[16px] animate-pulse flex-row rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>

            <form className="mt-2 flex flex-col space-y-4">
                <div className="flex h-[64px] animate-pulse flex-row items-center justify-between rounded-[8px] bg-gray-light-3 p-4 dark:bg-gray-dark-3"></div>
                <div className="flex h-[16px] animate-pulse flex-row rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></div>
                <div className="h-[80px] border-b border-dashed border-gray-light-5 pt-4 pb-8 dark:border-gray-dark-5"></div>

                <ButtonLoading>Loading...</ButtonLoading>
            </form>
        </div>
    );
};

export default FormLoading;
