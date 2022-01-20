import { Meta, Story } from "@storybook/react";

import ButtonBlueLink from "../../components/v0/ButtonBlueLink";

export default {
    component: ButtonBlueLink,
    title: "Risedle/Buttons/ButtonBlueLink",
} as Meta;

const Template: Story<{
    title: string;
    url: string;
}> = (args) => <ButtonBlueLink title={args.title} url={args.url} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { title: "Deposit", url: "/lend/deposit" };
