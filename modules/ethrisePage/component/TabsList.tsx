import { FunctionComponent } from "react";
import { List, Trigger } from "@radix-ui/react-tabs";

/**
 * TabsListProps is a React Component properties that passed to React Component TabsList
 */
type TabsListProps = {};

/**
 * TabsList is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const TabsList: FunctionComponent<TabsListProps> = ({}) => {
    return (
        <List aria-label="ETHRISE" className="mb-6 flex flex-row rounded-[12px] bg-gray-light-3 p-1 dark:bg-gray-dark-2 sm:max-w-[343px]">
            <Trigger value="leverage" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                Leverage
            </Trigger>
            <Trigger value="lend" className="basis-1/2 rounded-[8px] text-sm leading-4 text-gray-light-10 state-active:bg-gray-light-1 state-active:py-[12px] state-active:font-bold state-active:text-gray-light-12 dark:text-gray-dark-10 state-active:dark:bg-gray-dark-4 state-active:dark:text-gray-dark-12">
                Lend
            </Trigger>
        </List>
    );
};

export default TabsList;
