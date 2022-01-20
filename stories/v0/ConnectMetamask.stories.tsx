import { Meta, Story } from "@storybook/react";
// // import { DAppProvider, ChainId } from "@usedapp/core";
// import { Fragment } from "react";

import ConnectMetamask from "../../components/v0/ConnectWallet";

export default {
    component: ConnectMetamask,
    title: "Risedle/Wallet/ConnectMetamask",
} as Meta;

// const Template: Story<{}> = () => {
//     // Get the rinkeby URL from .env file
//     let rinkebyURL = "";
//     if (process.env.ALCHEMY_RINKEBY_URL) {
//         rinkebyURL = process.env.ALCHEMY_RINKEBY_URL;
//     }
//     // const config = {
//     //     readOnlyChainId: ChainId.Rinkeby,
//     //     readOnlyUrls: {
//     //         [ChainId.Rinkeby]: rinkebyURL,
//     //     },
//     // };

//     // Simulate inside app page
//     return (
//         <Fragment>
//             <DAppProvider config={config}>
//                 {/* TODO(bayu): Implement connect metamask for storybook */}
//                 {/* <ConnectMetamask /> */}
//             </DAppProvider>
//         </Fragment>
//     );
// };

// //Each story then reuses that template
// export const Default = Template.bind({});
