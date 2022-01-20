import { Meta, Story } from "@storybook/react";

import ButtonGreyLink from "../../components/v0/ButtonGreyLink";

export default {
    component: ButtonGreyLink,
    title: "Risedle/Buttons/ButtonGreyLink",
} as Meta;

const Template: Story<{
    title: string;
    url: string;
}> = (args) => <ButtonGreyLink title={args.title} url={args.url} />;

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    title: "See transaction",
    url: "https://kovan.etherscan.io/tx/0xac2d88e94234aedebb87544374a75e89b64ababed1be99154765642217c68faa",
};
