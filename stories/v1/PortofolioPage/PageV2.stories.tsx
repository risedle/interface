import { Meta, Story } from "@storybook/react";

import PortofolioPageV2 from "../../../components/v1/PortfolioPage/PortfolioPageV2";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: PortofolioPageV2,
    title: "Risedle V1/Portofolio Page/PageV2",
} as Meta;

const Template: Story<{}> = () => {
    return (
        <Wallet>
            <PortofolioPageV2 />
        </Wallet>
    );
};

//Each story then reuses that template
export const Page = Template.bind({});
