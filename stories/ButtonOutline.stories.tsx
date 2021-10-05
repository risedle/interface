import { Meta, Story } from "@storybook/react";

import ButtonOutline from "../components/ButtonOutline";

export default {
    component: ButtonOutline,
    title: "Risedle/Components/ButtonOutline",
} as Meta;

const Template: Story<{
    label: string;
}> = (args) => <ButtonOutline>{args.label}</ButtonOutline>;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Connect wallet" };
