import { Meta, Story } from "@storybook/react";

import ButtonBlue from "../../components/v0/ButtonBlue";

export default {
    component: ButtonBlue,
    title: "Risedle/Buttons/ButtonBlue",
} as Meta;

const Template: Story<{
    label: string;
}> = (args) => <ButtonBlue>{args.label}</ButtonBlue>;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Invest" };
