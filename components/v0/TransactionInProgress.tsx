import type { FunctionComponent } from "react";

// Import button
import ButtonGreyLink from "./ButtonGreyLink";

/**
 * TransactionInProgressProps is a React Component properties that passed to React
 * Component Button
 */
type TransactionInProgressProps = {
    title: string;
    subTitle: string;
    transactionLink: string;
};

/**
 * TransactionInProgress is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const TransactionInProgress: FunctionComponent<TransactionInProgressProps> = ({ title, subTitle, transactionLink }) => {
    return (
        <div className="mx-auto text-center" style={{ width: "480px" }}>
            <div className="inline-block items-center">
                <svg className="animate-ping" width="64" height="60" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M42.8429 24.3411C56.7602 26.2144 63.719 27.1512 63.9794 29.284C64.0069 29.5081 64.0069 29.7344 63.9794 29.9584C63.719 32.0913 56.7604 33.028 42.8433 34.9015C41.1095 35.1349 40.2421 35.2517 39.6229 35.7738C39.5487 35.8363 39.4777 35.9027 39.4105 35.9727C38.8491 36.5567 38.6763 37.4141 38.3307 39.1291L37.4534 43.4817C35.3358 53.9887 34.2769 59.2425 32.0001 59.2425C29.7231 59.2425 28.6643 53.9889 26.5466 43.4818L25.6693 39.1291C25.3237 37.4141 25.1509 36.5567 24.5895 35.9727C24.5224 35.9027 24.4514 35.8363 24.3771 35.7738C23.7579 35.2517 22.8911 35.135 21.1573 34.9016C7.23996 33.0281 0.280959 32.0913 0.0205862 29.9584C-0.00686206 29.7344 -0.00686205 29.5081 0.0205862 29.284C0.280961 27.1512 7.23978 26.2144 21.1573 24.3411C22.8905 24.1076 23.758 23.9907 24.3771 23.4689C24.4514 23.4061 24.5224 23.3397 24.5895 23.2698C25.1509 22.6859 25.3237 21.8284 25.6694 20.1134L26.5466 15.7608C28.6643 5.25374 29.7231 0 32.0001 0C34.2769 0 35.3357 5.25365 37.4534 15.761L38.3307 20.1134C38.6763 21.8284 38.8491 22.6859 39.4105 23.2698C39.4777 23.3397 39.5487 23.4061 39.6229 23.4689C40.242 23.9907 41.1086 24.1075 42.8419 24.3409L42.8429 24.3411Z"
                        fill="white"
                    />
                </svg>
            </div>
            <div className="mt-8">
                <h1 className="m-0 text-4xl font-extrabold leading-normal text-white">{title}</h1>
                <p className="m-0 text-2xl font-semibold leading-normal text-grey">{subTitle}</p>
            </div>
            <div className="mt-8">
                <ButtonGreyLink title="See transaction on explorer" url={transactionLink} />
            </div>
        </div>
    );
};

export default TransactionInProgress;
