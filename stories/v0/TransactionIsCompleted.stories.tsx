import { Meta, Story } from "@storybook/react";

import TransactionIsCompleted from "../../components/v0/TransactionIsCompleted";

export default {
    component: TransactionIsCompleted,
    title: "Risedle/Transaction/TransactionIsCompleted",
} as Meta;

const Template: Story<{
    title: string;
    subTitle: string;
    transactionLink: string;
    onClose: () => void;
}> = (args) => <TransactionIsCompleted title={args.title} subTitle={args.subTitle} transactionLink={args.transactionLink} onClose={args.onClose} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "Approval completed",
    subTitle: "Redirecting ...",
    transactionLink: "https://kovan.etherscan.io/tx/0xac2d88e94234aedebb87544374a75e89b64ababed1be99154765642217c68faa",
    onClose: () => {
        alert("Closed");
    },
};
