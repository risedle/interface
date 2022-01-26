import type { FunctionComponent } from "react";

/**
 * ButtonFailedToFetchOnchainDataProps is a React Component properties that passed to React Component ButtonFailedToFetchOnchainData
 */
type ButtonFailedToFetchOnchainDataProps = {};

/**
 * ButtonFailedToFetchOnchainData is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonFailedToFetchOnchainData: FunctionComponent<ButtonFailedToFetchOnchainDataProps> = ({}) => {
    return (
        <button className="cursor-not-allowed flex flex-row text-center justify-center items-center space-x-2 bg-gray-light-2 dark:bg-gray-dark-2 border border-gray-light-4 dark:border-gray-dark-4 text-blue-dark-1 dark:text-blue-light-1 text-sm leading-4 font-semibold py-[11px] px-4 rounded-full leading-4 inline-block tracking-[-0.02em] w-full">
            <span className="w-[8px] h-[8px] rounded-full bg-red-light-10 dark:bg-red-dark-10 shadow-[0px_0px_12px] shadow-red-light-10 dark:shadow-red-dark-10 inline-block mr-2"></span>
            <div>Failed to fetch onchain data</div>
        </button>
    );
};

export default ButtonFailedToFetchOnchainData;
