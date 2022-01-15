import { Meta, Story } from "@storybook/react";

import HomePage from "../../../components/v1/HomePage/HomePage";

export default {
    component: HomePage,
    title: "Risedle V1/Home Page/Page",
} as Meta;

const Template: Story<{}> = () => {
    return <HomePage />;
};

//Each story then reuses that template
export const Default = Template.bind({});
