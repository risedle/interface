import { utils } from "ethers";

// WETH address on kovan
// TODO(bayu): Change the value based on some env variable ENV=TESTNET or something
const ADDRESS = "0x64249d73AF4C3ABC7A9704Bf02188fa36d0B1Ed9";

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
    address: ADDRESS,
    interface: INTERFACE,
};
