import { Meta, Story } from "@storybook/react";

import ConnectWalletPrompt from "../../components/v0/ConnectWalletPrompt";

export default {
    component: ConnectWalletPrompt,
    title: "Risedle/Wallet/ConnectWalletPrompt",
} as Meta;

// const Template: Story<{ activateBrowserWallet: () => void }> = (args) => {
//     return (
//         <ConnectWalletPrompt
//             activateBrowserWallet={args.activateBrowserWallet}
//         />
//     );
// };

// //Each story then reuses that template
// export const Default = Template.bind({});
// Default.args = {
//     activateBrowserWallet: () => {
//         alert("ok");
//     },
// };
