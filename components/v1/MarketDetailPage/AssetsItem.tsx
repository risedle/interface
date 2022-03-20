import Image from "next/image";
import { tokenBalanceFormatter } from "../../../utils/formatters";

type AssetsItemProps = {
    showLoading: boolean;
    showData: boolean;
    value: string;
    title: string;
    image: string;
};

const AssetsItem = ({ showData, value, showLoading, title, image }: AssetsItemProps) => {
    return (
        <div className="flex flex-row">
            <div className="mr-3 h-8 w-8 rounded-full bg-gray-light-4 text-center leading-9 dark:bg-gray-800 ">
                <Image width={16} height={16} src={image} alt={image} />
            </div>
            <div>
                <p className="mb-1 text-sm leading-4 text-gray-light-10 dark:text-gray-dark-10">{title}</p>
                {showLoading && <p className="h-[16px] w-[100px] animate-pulse rounded-[8px] bg-gray-light-3 dark:bg-gray-dark-3"></p>}
                {showData && <p className="font-ibm text-sm font-semibold leading-4 tracking-[-.02em] text-gray-light-12 dark:text-gray-dark-12">{value}</p>}
            </div>
        </div>
    );
};

export { AssetsItem };
