import { useWalletContext } from "../../../components/v1/Wallet";

type NoPortfolioWarnProps = {
    type?: "chart" | "table";
};

const NoPortfolioWarn = ({ type = "table" }: NoPortfolioWarnProps) => {
    const { account } = useWalletContext();

    if (type === "chart") {
        return (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-fit rounded-md bg-gray-light-3 px-4 py-2 dark:bg-gray-dark-3">
                    <h1 className="text-center text-xs text-gray-light-10 dark:text-gray-dark-10">{account ? "You don't have any assets" : "Seems you're not connected to Risedle"}</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative pt-[10px]">
                <div className="space-y-[16px]">
                    <div className="h-[16px] w-full rounded-full bg-gray-light-3 opacity-40 dark:bg-gray-dark-3"></div>
                    <div className="h-[16px] w-full rounded-full bg-gray-light-3 opacity-40 dark:bg-gray-dark-3"></div>
                    <div className="h-[16px] w-full rounded-full bg-gray-light-3 opacity-40 dark:bg-gray-dark-3"></div>
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="w-fit rounded-md bg-gray-light-3 px-4 py-2 dark:bg-gray-dark-3">
                        <h1 className="text-center text-xs text-gray-light-10 dark:text-gray-dark-10">{account ? "You don't have any assets" : "Seems you're not connected to Risedle"}</h1>
                    </div>
                </div>
            </div>
        );
    }
};

export { NoPortfolioWarn };
