import { Meta, Story } from "@storybook/react";

import Footer from "../../../components/v1/HomePage/Footer";

export default {
    component: Footer,
    title: "Risedle V1/Home Page/Footer",
} as Meta;

const Template: Story<{}> = () => {
    return <Footer />;
};

//Each story then reuses that template
export const Default = Template.bind({});
