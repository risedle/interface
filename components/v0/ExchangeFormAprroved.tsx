import type { FunctionComponent } from "react";
import Link from "next/link";
import React, { useState } from "react";

// Import components
import ButtonBlue from "./ButtonBlue";

// Represents pair of title and value to displayed
export type ExchangeFormApprovedListItem = {
    title: string;
    value: string;
};

/**
 * ExchangeFormApprovedProps is a React Component properties that passed to React
 * Component Button
 */
type ExchangeFormApprovedProps = {
    backTitle: string;
    backURL: string;
    title: string;
    subTitle: string;
    formTitle: string;
    formPlaceholder: string;
    formInputToken: string;
    formInputTokenBalance: string;
    formOutputToken: string;
    formSubmitTitle: string;
    onClickSubmit: (amount: string) => void;
};

/**
 * ExchangeFormApproved is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ExchangeFormApproved: FunctionComponent<ExchangeFormApprovedProps> = ({ backTitle, backURL, title, subTitle, formTitle, formPlaceholder, formInputToken, formInputTokenBalance, formOutputToken, formSubmitTitle, onClickSubmit }) => {
    // Input states
    const [depositAmount, setDepositAmount] = useState("0");

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
                        <input type="text" className="w-full bg-black font-extrabold text-grey focus:outline-none" placeholder={formPlaceholder} onChange={(e) => setDepositAmount(e.target.value)} />
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
                <ButtonBlue
                    onClick={() => {
                        onClickSubmit(depositAmount);
                    }}
                >
                    {formSubmitTitle}
                </ButtonBlue>
            </div>
        </div>
    );
};

export default ExchangeFormApproved;
