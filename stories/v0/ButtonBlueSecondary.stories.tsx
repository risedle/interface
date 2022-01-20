import { Meta, Story } from "@storybook/react";

import ButtonBlueSecondary from "../../components/v0/ButtonBlueSecondary";

export default {
    component: ButtonBlueSecondary,
    title: "Risedle/Buttons/ButtonBlueSecondary",
} as Meta;

const Template: Story<{
    label: string;
}> = (args) => <ButtonBlueSecondary>{args.label}</ButtonBlueSecondary>;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Invest" };
