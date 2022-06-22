import Navigation from "../../modules/homePage/component/v2/Navigation";
import FirstJumbotron from "../../modules/homePage/component/v2/FirstJumbotron/FirstJumbotron";
import { SecondJumbotron } from "../../modules/homePage/component/v2/SecondJumbotron/SecondJumbotron";
import Footer from "../../modules/homePage/component/v2/Footer";
import FourthJumbotron from "../../modules/homePage/component/v2/FourthJumbotron/FourthJumbotron";
import ThirdJumbotron from "../../modules/homePage/component/v2/ThridJumbotron/ThridJumbotron";

export default function HomeV2() {
    return (
        <div className="h-full w-full overflow-hidden bg-dark-background-default font-inter ">
            <Navigation />
            <FirstJumbotron />
            <SecondJumbotron />
            <ThirdJumbotron />
            <FourthJumbotron />
            <Footer />
        </div>
    );
}
