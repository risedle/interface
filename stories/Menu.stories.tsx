import { Meta, Story } from "@storybook/react";

import Menu from "../components/Menu";

export default {
    component: Menu,
    title: "Risedle/Menu/Menu",
} as Meta;

const Template: Story<{}> = () => <Menu />;

//Each story then reuses that template
export const Default = Template.bind({});
