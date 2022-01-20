import { Meta, Story } from "@storybook/react";

import AUMLoading from "../../components/v0/AUMLoading";

export default {
    component: AUMLoading,
    title: "Risedle/AUM/AUMLoading",
} as Meta;

const Template: Story<{}> = (args) => <AUMLoading />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
