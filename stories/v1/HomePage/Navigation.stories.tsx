import { Meta, Story } from "@storybook/react";

import Navigation from "../../../components/v1/HomePage/Navigation";

export default {
    component: Navigation,
    title: "Risedle V1/Home Page/Navigation",
} as Meta;

const Template: Story<{}> = () => {
    return <Navigation />;
};

//Each story then reuses that template
export const Default = Template.bind({});
