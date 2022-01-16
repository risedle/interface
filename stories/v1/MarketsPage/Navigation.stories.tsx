import { Meta, Story } from "@storybook/react";

import Navigation from "../../../components/v1/MarketsPage/Navigation";

export default {
    component: Navigation,
    title: "Risedle V1/Markets Page/Navigation",
} as Meta;

const Template: Story<{}> = () => {
    return <Navigation />;
};

//Each story then reuses that template
export const Default = Template.bind({});
