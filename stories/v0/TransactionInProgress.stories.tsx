import { Meta, Story } from "@storybook/react";

import TransactionInProgress from "../../components/v0/TransactionInProgress";

export default {
    component: TransactionInProgress,
    title: "Risedle/Transaction/TransactionInProgress",
} as Meta;

const Template: Story<{
    title: string;
    subTitle: string;
    transactionLink: string;
}> = (args) => <TransactionInProgress title={args.title} subTitle={args.subTitle} transactionLink={args.transactionLink} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Approving ...",
    subTitle: "It may take a few minutes",
    transactionLink: "https://kovan.etherscan.io/tx/0xac2d88e94234aedebb87544374a75e89b64ababed1be99154765642217c68faa",
};
