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
            <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>

            <form className="flex flex-col mt-2 space-y-4">
                <div className="h-[64px] animate-pulse flex flex-row p-4 bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px] items-center justify-between"></div>
                <div className="flex flex-row h-[16px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 rounded-[8px]"></div>
                <div className="pt-4 pb-8 border-b border-gray-light-5 dark:border-gray-dark-5 border-dashed h-[80px]"></div>

                <ButtonLoading>Loading...</ButtonLoading>
            </form>
        </div>
    );
};

export default FormLoading;
