import { Meta, Story } from "@storybook/react";

import PortofolioPage from "../../../components/v1/PortofolioPage/PortofolioPage";
import { Wallet } from "../../../components/v1/Wallet";

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
