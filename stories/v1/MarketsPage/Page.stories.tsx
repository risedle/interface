import { Meta, Story } from "@storybook/react";

import MarketsPage from "../../../components/v1/MarketsPage/MarketsPage";
import { Wallet } from "../../../components/v1/Wallet";

export default {
    component: MarketsPage,
    title: "Risedle V1/Markets Page/Page",
} as Meta;

const Template: Story<{}> = () => {
    return (
        <Wallet>
            <MarketsPage />
        </Wallet>
    );
};

//Each story then reuses that template
export const Page = Template.bind({});
