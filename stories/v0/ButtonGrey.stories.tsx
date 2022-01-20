import { Meta, Story } from "@storybook/react";

import ButtonGrey from "../../components/v0/ButtonGrey";

export default {
    component: ButtonGrey,
    title: "Risedle/Buttons/ButtonGrey",
} as Meta;

const Template: Story<{
    label: string;
}> = (args) => <ButtonGrey>{args.label}</ButtonGrey>;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { label: "Rinkeby" };
