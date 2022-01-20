import { Meta, Story } from "@storybook/react";

import Logo from "../../components/v0/Logo";

export default {
    component: Logo,
    title: "Risedle/Logo/Logo",
} as Meta;

const Template: Story<{}> = () => <Logo />;

//Each story then reuses that template
export const Default = Template.bind({});
