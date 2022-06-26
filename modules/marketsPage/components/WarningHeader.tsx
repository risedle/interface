import { FunctionComponent, useState } from "react";
import { useWalletContext, customChains } from "../../../components/v1/Wallet";
import createPersistedState from "use-persisted-state";
import WarningModal from "./WarningModal";

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
    const [isOpen, setIsOpen] = useState(false);
    const { chain } = useWalletContext();

    const getBscLogo = (type: "normal" | "gray") => {
        return (
            <svg className={`h-4 w-4 ${type === "gray" ? "fill-gray-light-11 dark:fill-gray-dark-11" : "fill-amber-light-11 dark:fill-amber-dark-11"}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.417 15.9472V17.9657L9.65709 19L7.94717 17.9657V15.9472L9.65709 16.9815L11.417 15.9472ZM2 8.96571L3.70992 10V13.4615L6.65431 15.2215V17.24L2 14.4958V8.96571ZM17.3142 8.96571V14.5042L12.6098 17.2484V15.2298L15.5542 13.4699V10L17.3142 8.96571ZM12.6015 6.2215L14.3614 7.25579V9.27433L11.417 11.0343V14.5542L9.70713 15.5885L7.99722 14.5542V11.0343L4.94439 9.27433V7.25579L6.70435 6.2215L9.64874 7.98146L12.6015 6.2215ZM4.95273 10.7257L6.66265 11.76V13.7785L4.95273 12.7442V10.7257ZM14.3614 10.7257V12.7442L12.6515 13.7785V11.76L14.3614 10.7257ZM3.70992 4.46154L5.46988 5.49583L3.70992 6.53012V8.54866L2 7.51437V5.49583L3.70992 4.46154ZM15.6043 4.46154L17.3642 5.49583V7.51437L15.6043 8.54866V6.53012L13.8943 5.49583L15.6043 4.46154ZM9.65709 4.46154L11.417 5.49583L9.65709 6.53846L7.94717 5.50417L9.65709 4.46154ZM9.65709 1L14.3614 3.74421L12.6515 4.7785L9.70713 3.01853L6.70435 4.7785L5.00278 3.74421L9.65709 1Z" />
            </svg>
        );
    };

    const useShowBSCWarning = createPersistedState("risedle.showBSCWarning");
    const [showBSCWarning, setShowBSCWarning] = useShowBSCWarning(true);

    return (
        <>
            <div className={`relative ${chain.chain.id !== customChains.bsc.id || !showBSCWarning ? "hidden" : "block"} z-10`}>
                <div className="flex w-max min-w-full flex-row gap-8 border-b border-gray-light-4 bg-[#FFF9ED]/40 px-4 py-3 backdrop-blur-[102px] dark:border-gray-dark-4 dark:bg-gray-dark-1/40">
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
                <div className="absolute top-0 right-0 flex h-[41px] w-[120px] items-center justify-end bg-gradient-to-r from-transparent to-gray-light-1 px-4 dark:to-gray-dark-1">
                    <button onClick={() => setIsOpen(true)}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-light-12 dark:fill-gray-dark-12">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <WarningModal isOpen={isOpen} setIsOpen={setIsOpen} showBSCWarning={showBSCWarning} setShowBSCWarning={setShowBSCWarning} />
        </>
    );
};

export default WarningHeader;
