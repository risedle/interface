import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "../../../uikit/button/ButtonConnectWallet";

export default {
    title: "Risedle v1/Buttons/Button Connect Wallet",
    component: Button,
    argTypes: {
        disabled: {
            defaultValue: false,
            type: "boolean",
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonConnectWallet = Template.bind({});

ButtonConnectWallet.args = {
    type: "bsc",
    children: "Connect Wallet",
};
