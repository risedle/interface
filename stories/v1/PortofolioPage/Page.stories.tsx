import { Meta, Story } from "@storybook/react";

import { Wallet } from "../../../components/v1/Wallet";
import PortofolioPage from "../../../modules/portofolio/component/PortfolioPage";

export default {
    component: PortofolioPage,
    title: "Risedle V1/Portofolio Page/Page",
} as Meta;

const Template: Story<{}> = () => {
    return (
        <Wallet>
            <PortofolioPage />
        </Wallet>
    );
};

//Each story then reuses that template
export const Page = Template.bind({});
