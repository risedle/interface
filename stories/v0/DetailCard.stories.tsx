import { Meta, Story } from "@storybook/react";

import DetailCard, { DetailCardListItem } from "../../components/v0/DetailCard";

export default {
    component: DetailCard,
    title: "Risedle/Details/DetailCard",
} as Meta;

const Template: Story<{
    items: Array<DetailCardListItem>;
}> = (args) => <DetailCard items={args.items} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    items: [
        {
            title: "Your balance",
            value: "0.00 rvUSDC",
        },
        {
            title: "Available to withdraw",
            value: "0.00 rvUSDC",
        },
        {
            title: "Total value",
            value: "0.00 USDC",
        },
    ],
};
