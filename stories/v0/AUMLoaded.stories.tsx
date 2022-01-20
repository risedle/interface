import { Meta, Story } from "@storybook/react";

import AUMLoaded from "../../components/v0/AUMLoaded";

export default {
    component: AUMLoaded,
    title: "Risedle/AUM/AUMLoaded",
} as Meta;

const Template: Story<{ text: string }> = (args) => <AUMLoaded text={args.text} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { text: "$100,000" };
