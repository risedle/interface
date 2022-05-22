import { useRef } from "react";
import FirstItem from "./FirstItem";
import SecondItem from "./SecondItem";
import { useJumbotronTwo } from "./Store";
import ThirdItem from "./ThirdItem";

const listItem = ["Trader", "Liquidity Provider", "Crypto Project"];

export default function Jumbotron2() {
    const jumbotronState = useJumbotronTwo();
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div className="max-h-screen overflow-hidden">
            <div className="flex max-w-[400px]  py-4 text-white	">
                {listItem.map((item, index) => (
                    <p
                        onClick={() => {
                            containerRef.current?.scroll({
                                top: containerRef.current?.clientHeight * index,
                                behavior: "smooth",
                            });
                        }}
                        key={`${index} ${item}`}
                        className={`cursor-pointer border-b-2 border-gray-${jumbotronState.activeIndex === index ? "400" : "800"} px-2 py-2`}
                    >
                        {item}
                    </p>
                ))}
            </div>
            <div
                onScroll={() => {
                    if (containerRef.current) {
                        jumbotronState.setActiveIndex(Math.ceil(containerRef.current.scrollTop / containerRef.current?.clientHeight));
                    }
                }}
                ref={containerRef}
                className="no-scrollbar h-screen snap-y snap-mandatory overflow-scroll "
            >
                <FirstItem />
                <SecondItem />
                <ThirdItem />
            </div>
        </div>
    );
}
