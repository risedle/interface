import { utils } from "ethers";

const UDSC_ADDRESS = "0x8b07CD71F5C4329F309Fc3330D3308a076a347da";
const WETH_ADDRESS = "0xA264114C65e26a864153314FBC1b3F49Bf29123d";

const INTERFACE = new utils.Interface([
    // Read only
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)",

    // Write
    "function approve(address spender, uint256 amount) external",

    // Events
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

export default {
    interface: INTERFACE,
    usdc: UDSC_ADDRESS,
    weth: WETH_ADDRESS,
};
