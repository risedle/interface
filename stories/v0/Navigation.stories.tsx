import { Meta, Story } from "@storybook/react";
// import { DAppProvider, ChainId } from "@usedapp/core";
import { Fragment } from "react";

import Navigation from "../../components/v0/Navigation";

export default {
    component: Navigation,
    title: "Risedle/Navigation/Navigation",
} as Meta;

// const Template: Story<{}> = () => {
//     // Get the rinkeby URL from .env file
//     let rinkebyURL = "";
//     if (process.env.ALCHEMY_RINKEBY_URL) {
//         rinkebyURL = process.env.ALCHEMY_RINKEBY_URL;
//     }
//     const config = {
//         readOnlyChainId: ChainId.Rinkeby,
//         readOnlyUrls: {
//             [ChainId.Rinkeby]: rinkebyURL,
//         },
//     };

//     // Simulate inside app page
//     return (
//         <Fragment>
//             {/* TODO(bayu): Implement Navigation for storybook */}
//             <DAppProvider config={config}>{/* <Navigation /> */}</DAppProvider>
//         </Fragment>
//     );
// };

// //Each story then reuses that template
// export const Default = Template.bind({});
