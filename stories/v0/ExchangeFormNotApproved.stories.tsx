import { Meta, Story } from "@storybook/react";

import ExchangeFormNotApproved from "../../components/v0/ExchangeFormNotApproved";

export default {
    component: ExchangeFormNotApproved,
    title: "Risedle/Exchange/ExchangeFormNotApproved",
} as Meta;

const Template: Story<{
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
}> = (args) => <ExchangeFormNotApproved backTitle={args.backTitle} backURL={args.backURL} title={args.title} subTitle={args.subTitle} formTitle={args.formTitle} formPlaceholder={args.formPlaceholder} formInputToken={args.formInputToken} formInputTokenBalance={args.formInputTokenBalance} formOutputToken={args.formOutputToken} onClickApprove={args.onClickApprove} />;

function approve() {
    alert("approve");
}

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    backTitle: "← Go back to lend",
    backURL: "/lend",
    title: "Deposit USDC",
    subTitle: "Earn variable interest rate instantly.",
    formTitle: "Deposit amount",
    formPlaceholder: "Enter deposit amount",
    formInputToken: "USDC",
    formInputTokenBalance: "100",
    formOutputToken: "rvUSDC",
    onClickApprove: approve,
};
