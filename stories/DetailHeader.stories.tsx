import { Meta, Story } from "@storybook/react";

import DetailHeader from "../components/DetailHeader";

// PNG files
import USDC_ICON from "../public/USDC_ICON.png";

export default {
    component: DetailHeader,
    title: "Risedle/Details/DetailHeader",
} as Meta;

const Template: Story<{
    image: StaticImageData;
    title: string;
    subTitle: string;
    leftTitle: string;
    leftPath: string;
    rightTitle: string;
    rightPath: string;
}> = (args) => (
    <DetailHeader
        image={args.image}
        title={args.title}
        subTitle={args.subTitle}
        leftTitle={args.leftTitle}
        leftPath={args.leftPath}
        rightTitle={args.rightTitle}
        rightPath={args.rightPath}
    />
);

//Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    image: USDC_ICON,
    title: "Earn 56.75% APY",
    subTitle: "TVL 10,000.00 USDC",
    leftTitle: "Deposit",
    leftPath: "/lend/deposit",
    rightTitle: "Withdraw",
    rightPath: "/lend/withdraw",
};
