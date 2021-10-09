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
const ExchangeFormNotApproved: FunctionComponent<ExchangeFormNotApprovedProps> =
    ({
        backTitle,
        backURL,
        title,
        subTitle,
        formTitle,
        formPlaceholder,
        formInputToken,
        formInputTokenBalance,
        onClickApprove,
    }) => {
        return (
            <div className="mx-auto" style={{ width: "480px" }}>
                <div>
                    <p className="m-0">
                        <Link href={backURL}>
                            <a className="font-extrabold text-grey">
                                {backTitle}
                            </a>
                        </Link>
                    </p>
                </div>
                <div>
                    <h1 className="text-white font-extrabold text-4xl m-0 leading-normal">
                        {title}
                    </h1>
                    <p className="text-grey font-semibold text-2xl m-0 leading-normal">
                        {subTitle}
                    </p>
                </div>
                <div className="mt-8">
                    <label className="text-white font-extrabold m-0 leading-normal">
                        {formTitle}
                    </label>
                    <div
                        className="w-full flex border-b-2 border-white border-opacity-20 items-center mt-2"
                        style={{ height: "40px" }}
                    >
                        <div className="w-10/12">
                            <input
                                type="number"
                                className="w-full focus:outline-none font-extrabold text-grey bg-black cursor-not-allowed"
                                disabled
                                placeholder={formPlaceholder}
                            />
                        </div>
                        <div className="w-2/12 font-extrabold text-grey bg-black text-right">
                            {formInputToken}
                        </div>
                    </div>

                    <p className="text-grey font-extrabold mt-4">
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
