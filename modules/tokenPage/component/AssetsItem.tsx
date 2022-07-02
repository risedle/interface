import { useRouter } from "next/router";
import ReturnDollarIcon from "../../../uikit/icon/ReturnDollarIcon";
import ReturnIcon from "../../../uikit/icon/ReturnIcon";
import TokenBalanceIcon from "../../../uikit/icon/TokenBalanceIcon";
import ValueIcon from "../../../uikit/icon/ValueIcon";

type AssetsItemProps = {
    icon: "balance" | "value" | "return" | "returnUSD";
    showLoading: boolean;
    showData: boolean;
    value: string;
    title: string;
};

const AssetsItem = ({ icon, showData, value, showLoading, title }: AssetsItemProps) => {
    const router = useRouter();
    const type: "bsc" | "arb" = router.pathname.includes("binance") ? "bsc" : "arb";
    const renderIcon = () => {
        switch (icon) {
            case "balance":
                return <TokenBalanceIcon type={type} />;
            case "value":
                return <ValueIcon type={type} />;
            case "return":
                return <ReturnIcon type={type} />;
            case "returnUSD":
                return <ReturnDollarIcon type={type} />;
        }
    };
    return (
        <div className="flex flex-row">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-light-4 text-center leading-9 dark:bg-gray-800 ">{renderIcon()}</div>
            <div>
                <p className="mb-1 text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{title}</p>
                {showLoading && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{value}</p>}
            </div>
        </div>
    );
};

export { AssetsItem };
