import { useWalletContext } from "../Wallet";

type NoPorotoflioWarnProps = {
    type?: "chart" | "table";
};

const NoPorotoflioWarn = ({ type = "table" }: NoPorotoflioWarnProps) => {
    const { account } = useWalletContext();

    if(type === "chart"){
        return(
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="w-fit rounded-md px-4 py-2 bg-gray-light-3 dark:bg-gray-dark-3">
                    <h1 className="text-center text-xs text-gray-light-10">{account ? "You don't have any assets" : "Seems you're not connected to Risedle"}</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className="relative pt-[10px]">
                <div className="space-y-[16px]" >
                    <div className="bg-gray-light-3 dark:bg-gray-dark-3 rounded-full w-full h-[16px] opacity-40"></div>
                    <div className="bg-gray-light-3 dark:bg-gray-dark-3 rounded-full w-full h-[16px] opacity-40"></div>
                    <div className="bg-gray-light-3 dark:bg-gray-dark-3 rounded-full w-full h-[16px] opacity-40"></div>
                </div>
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <div className="w-fit rounded-md px-4 py-2 bg-gray-light-3 dark:bg-gray-dark-3">
                        <h1 className="text-center text-xs text-gray-light-10">{account ? "You don't have any assets" : "Seems you're not connected to Risedle"}</h1>
                    </div>
                </div>
            </div>
            
        );
    }
};

export { NoPorotoflioWarn };
