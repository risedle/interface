import { Meta, Story } from "@storybook/react";

import ETFCard from "../../components/v0/ETFCard";

export default {
    component: ETFCard,
    title: "Risedle/ETF/ETFCard",
} as Meta;

const Template: Story<{
    title: string;
    subTitle: string;
    etfURL: string;
    navPrice: string;
    change30d: string;
}> = (args) => <ETFCard title={args.title} subTitle={args.subTitle} etfURL={args.etfURL} navPrice={args.navPrice} change30d={args.change30d} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "ETHRISE",
    subTitle: "ETH 2x Leverage Risedle",
    etfURL: "/invest/ethrise",
    navPrice: "100 USDC",
    change30d: "+24%",
};
