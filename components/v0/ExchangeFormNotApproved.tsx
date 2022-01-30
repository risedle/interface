import type { FunctionComponent } from "react";
import Link from "next/link";

// Import components
import ButtonBlueSecondary from "./ButtonBlueSecondary";

// Represents pair of title and value to displayed
export type ExchangeFormNotApprovedListItem = {
    title: string;
    value: string;
};

/**
 * ExchangeFormNotApprovedProps is a React Component properties that passed to React
 * Component Button
 */
type ExchangeFormNotApprovedProps = {
    backTitle: string;
    backURL: string;
    title: string;
    subTitle: string;
    formTitle: string;
    formPlaceholder: string;
    formInputToken: string;
    formInputTokenBalance: string;
    formOutputToken: string;
    onClickApprove: () => void;
};

/**
 * ExchangeFormNotApproved is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ExchangeFormNotApproved: FunctionComponent<ExchangeFormNotApprovedProps> = ({ backTitle, backURL, title, subTitle, formTitle, formPlaceholder, formInputToken, formInputTokenBalance, onClickApprove }) => {
    return (
        <div className="mx-auto" style={{ width: "480px" }}>
            <div>
                <p className="m-0">
                    <Link href={backURL}>
                        <a className="font-extrabold text-grey">{backTitle}</a>
                    </Link>
                </p>
            </div>
            <div>
                <h1 className="m-0 text-4xl font-extrabold leading-normal text-white">{title}</h1>
                <p className="m-0 text-2xl font-semibold leading-normal text-grey">{subTitle}</p>
            </div>
            <div className="mt-8">
                <label className="m-0 font-extrabold leading-normal text-white">{formTitle}</label>
                <div className="mt-2 flex w-full items-center border-b-2 border-white border-opacity-20" style={{ height: "40px" }}>
                    <div className="w-10/12">
                        <input type="number" className="w-full cursor-not-allowed bg-black font-extrabold text-grey focus:outline-none" disabled placeholder={formPlaceholder} />
                    </div>
                    <div className="w-2/12 bg-black text-right font-extrabold text-grey">{formInputToken}</div>
                </div>

                <p className="mt-4 font-extrabold text-grey">
                    <span>Balance </span>
                    <span className="text-white">
                        {formInputTokenBalance} {formInputToken}
                    </span>
                </p>
            </div>
            <div className="mt-8 text-right">
                <ButtonBlueSecondary
                    onClick={() => {
                        onClickApprove();
                    }}
                >
                    Approve {formInputToken}
                </ButtonBlueSecondary>
            </div>
        </div>
    );
};

export default ExchangeFormNotApproved;
