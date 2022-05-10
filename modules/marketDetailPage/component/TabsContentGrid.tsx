import { FunctionComponent, ReactNode } from "react";
import { Content } from "@radix-ui/react-tabs";

/**
 * TabsContentGridProps is a React Component properties that passed to React Component TabsContentGrid
 */
type TabsContentGridProps = {
    value: string;
    children: ReactNode;
};

/**
 * TabsContentGrid is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const TabsContentGrid: FunctionComponent<TabsContentGridProps> = ({ value, children }) => {
    return (
        <Content value={value} className="mx-auto flex flex-col space-y-6 outline-0 sm:gap-[24px] sm:space-y-0 lg:grid lg:grid-cols-2">
            {children}
        </Content>
    );
};

export default TabsContentGrid;
