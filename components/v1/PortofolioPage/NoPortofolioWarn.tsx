import { useWalletContext } from "../Wallet";

type NoPorotoflioWarnProps = {
    type?: "chart" | "table";
};

const NoPorotoflioWarn = ({ type = "table" }: NoPorotoflioWarnProps) => {
    const { account } = useWalletContext();

    return (
        <div className={` ${type === "chart" && "absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2  "} m-0 w-full text-center `}>
            <div className="relative left-1/2 w-fit -translate-x-1/2 rounded-md px-4 py-2 dark:bg-gray-dark-3">
                <h1 className="text-xs text-gray-light-10">{account ? "You don't have any assets" : "Seems you're not connected to Risedle"}</h1>
            </div>
        </div>
    );
};

export { NoPorotoflioWarn };
