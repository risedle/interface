import { utils } from "ethers";

const UDSC_ADDRESS = "0x0Af08696CB51e81456DC0a1dee7F8BfAD8d82a22";
const WETH_ADDRESS = "0x1673801682F5EAE287Bb7081Cf7d0D1d768E661a";

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
