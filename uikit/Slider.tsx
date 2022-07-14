import { FunctionComponent } from "react";
import * as RadixSlider from "@radix-ui/react-slider";

type SliderProps = {
    color: "bsc" | "arbitrum";
} & RadixSlider.SliderProps;

/**
 * React Component to render OpenGraph website
 */
const Slider: FunctionComponent<SliderProps> = ({ color = "bsc", ...restProps }) => {
    return (
        <RadixSlider.Root className="relative flex w-full flex-row items-center" {...restProps}>
            <RadixSlider.Track className="relative h-0.5 w-full bg-gray-light-4 dark:bg-gray-dark-4">
                <RadixSlider.Range className={`absolute h-0.5 ${color === "bsc" ? "bg-amber-light-8 dark:bg-amber-dark-8" : "bg-violet-light-10 dark:bg-violet-dark-10"}`} />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="block h-5 w-5 rounded-full border border-gray-light-5 bg-gray-light-1 dark:border-0 dark:bg-gray-dark-12" />
        </RadixSlider.Root>
    );
};

export default Slider;
