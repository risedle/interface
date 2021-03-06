import { useState } from "react";
import { InformationCardTitle, InformationCard, InformationCardSubTitle } from "../../../uikit/card/FLTInformationCard";
import { Dash, TextLeftDash, TextRightDash } from "../../../uikit/Dash";
import Slider from "../../../uikit/Slider";

function Calculator() {
    const [currentMarketPrice, setCurrent] = useState();
    const [sliderValue, setSliderValue] = useState(0);
    return (
        <InformationCard>
            <InformationCardTitle>Calulate My Profit</InformationCardTitle>
            <InformationCardSubTitle>Let&#180;s try to simulate how much you&#180;ll get if the ETH price is higher or lower when you invested some ETH</InformationCardSubTitle>
            <Dash>
                <TextLeftDash className="text-xs font-semibold text-white">You Want To Buy</TextLeftDash>
            </Dash>
            <div className=" rounded-xl bg-gray-dark-3 p-3 px-2">
                <div className="flex justify-between">
                    <div>
                        <div className="max-w-fit rounded-lg bg-gray-dark-2 py-2 px-1">
                            <h3 className=" text-xs font-bold text-white">ETH</h3>
                        </div>
                        <span className="text-xs text-gray-dark-10">Mkt. Price $2,380.23</span>
                    </div>
                    <div className="flex-col justify-center self-center">
                        <input type="number" className="max-h-[32px] max-w-[60px] self-center rounded-lg bg-gray-dark-2 text-right text-[16px] font-bold text-white"></input>
                        <p className="pt-2 text-right text-xs text-gray-dark-10">$2,800</p>
                    </div>
                </div>
            </div>
            <Dash>
                <TextLeftDash className="text-xs font-semibold text-white">Expected Market Price</TextLeftDash>
                <TextRightDash className="text-sm font-bold text-gray-dark-12">$3,450.34</TextRightDash>
            </Dash>
            <Slider color="bsc" min={-30} max={30} value={[sliderValue]} onValueChange={(val) => setSliderValue(val[0])} />
            <p className="text-xs text-green-dark-11">
                {sliderValue > 0 && "+"}
                {sliderValue}% <span className="text-gray-dark-10">From current Mkt. Price</span>
            </p>

            <Dash>
                <TextLeftDash className="text-xs font-semibold text-white ">Est. Net Profit Gain</TextLeftDash>
                <TextRightDash className="text-sm font-bold text-green-dark-11">+$2,800.00</TextRightDash>
            </Dash>
        </InformationCard>
    );
}

export { Calculator };
