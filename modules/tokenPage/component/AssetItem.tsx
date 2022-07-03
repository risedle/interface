import Button from "../../../uikit/buttonV2/Button";
import { tokenBalanceFormatter } from "../../../utils/formatters";
import { useAssetStore } from "../../tokenPage/store/assetStore";

type AssetsItemProps = {
    variant: AssetItemsVariant;
};

const mapper = {
    token: {
        title: "Token Balance",
        image: "/markets/tokenBalanceIcon.svg",
    },
    value: {
        title: "Value (USDC)",
        image: "/markets/valueIcon.svg",
    },
    return: {
        title: "Return",
        image: "/markets/returnIcon.svg",
    },
    returnDollar: {
        title: "Return (USDC)",
        image: "/markets/returnDollarIcon.svg",
    },
};

type AssetItemsVariant = keyof typeof mapper;

const AssetsItem = ({ variant }: AssetsItemProps) => {
    const { state } = useAssetStore();

    const RenderData = () => {
        switch (state.status) {
            case "loading":
                return <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>;
            case "loaded":
                let renderedValue;
                switch (variant) {
                    case "value":
                        renderedValue = tokenBalanceFormatter.format(state.nav * state.balance);
                        break;
                    case "token":
                        renderedValue = tokenBalanceFormatter.format(state.balance);
                        break;
                    default:
                        renderedValue = "-";
                }
                return <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{renderedValue}</p>;
            case "error":
                return null;
        }
    };

    return (
        <div className="flex flex-row">
            <div className="mr-3 h-8 w-8 rounded-full bg-gray-light-4 text-center leading-9 dark:bg-gray-800 ">
                <img className="mx-auto mt-2" width={16} height={16} src={mapper[variant].image} alt={mapper[variant].image} />
            </div>
            <div>
                <p className="mb-1 text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{mapper[variant].title}</p>
                <RenderData />
            </div>
        </div>
    );
};

export { AssetsItem };
