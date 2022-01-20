import { Meta, Story } from "@storybook/react";

import ButtonOutlineCircle from "../../components/v0/ButtonOutlineCircle";

// PNG files
import ThreeDots from "../../public/three-dots.png";

export default {
    component: ButtonOutlineCircle,
    title: "Risedle/Buttons/ButtonOutlineCircle",
} as Meta;

const Template: Story<{
    icon: string;
}> = (args) => <ButtonOutlineCircle icon={args.icon} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = { icon: ThreeDots.src };
