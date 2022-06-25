import type { FunctionComponent } from "react";
import { useWalletContext, customChains } from "../../../components/v1/Wallet";
import { chain as Chains } from "wagmi";

/**
 * WarningHeaderProps is a React Component properties that passed to React Component WarningHeader
 */
type WarningHeaderProps = {};

/**
 * WarningHeader is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const WarningHeader: FunctionComponent<WarningHeaderProps> = ({}) => {
    const { chain } = useWalletContext();

    const getBscLogo = (type: "normal" | "gray") => {
        return (
            <svg className={`h-4 w-4 ${type === "gray" ? "fill-gray-light-11 dark:fill-gray-dark-11" : "fill-amber-light-11 dark:fill-amber-dark-11"}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.417 15.9472V17.9657L9.65709 19L7.94717 17.9657V15.9472L9.65709 16.9815L11.417 15.9472ZM2 8.96571L3.70992 10V13.4615L6.65431 15.2215V17.24L2 14.4958V8.96571ZM17.3142 8.96571V14.5042L12.6098 17.2484V15.2298L15.5542 13.4699V10L17.3142 8.96571ZM12.6015 6.2215L14.3614 7.25579V9.27433L11.417 11.0343V14.5542L9.70713 15.5885L7.99722 14.5542V11.0343L4.94439 9.27433V7.25579L6.70435 6.2215L9.64874 7.98146L12.6015 6.2215ZM4.95273 10.7257L6.66265 11.76V13.7785L4.95273 12.7442V10.7257ZM14.3614 10.7257V12.7442L12.6515 13.7785V11.76L14.3614 10.7257ZM3.70992 4.46154L5.46988 5.49583L3.70992 6.53012V8.54866L2 7.51437V5.49583L3.70992 4.46154ZM15.6043 4.46154L17.3642 5.49583V7.51437L15.6043 8.54866V6.53012L13.8943 5.49583L15.6043 4.46154ZM9.65709 4.46154L11.417 5.49583L9.65709 6.53846L7.94717 5.50417L9.65709 4.46154ZM9.65709 1L14.3614 3.74421L12.6515 4.7785L9.70713 3.01853L6.70435 4.7785L5.00278 3.74421L9.65709 1Z" />
            </svg>
        );
    };

    return (
        <div className={`${chain.chain.id !== customChains.bsc.id && "hidden"} z-10 flex w-max min-w-full flex-row gap-8 border-b border-gray-light-4 bg-[#FFF9ED]/40 px-4 py-3 backdrop-blur-[102px] dark:border-gray-dark-4 dark:bg-gray-dark-1/40`}>
            {[...Array(10)].map(() => {
                return (
                    <>
                        <div className="flex flex-row items-center gap-1.5 border-r border-amber-light-11/10 pr-8 dark:border-amber-dark-11/10">
                            <p className="text-xs tracking-[-0.03em] text-amber-light-11 dark:text-amber-dark-11">Use at your own risk</p>
                            {getBscLogo("normal")}
                        </div>
                        <div className="flex flex-row items-center gap-1.5 border-r border-amber-light-11/10 pr-8 dark:border-amber-dark-11/10">
                            <p className="text-xs tracking-[-0.03em] text-gray-light-11 dark:text-gray-dark-11">Binance Smart Chain</p>
                            {getBscLogo("gray")}
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default WarningHeader;
