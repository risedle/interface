import Navigation from "../../modules/homePage/component/v2/Navigation";
import FirstJumbotron from "../../modules/homePage/component/v2/FirstJumbotron";
import { SecondJumbotron } from "../../modules/homePage/component/v2/SecondJumbotron/SecondJumbotron";
import { ThirdJumbotron } from "../../stories/v2/HomePage/ThirdJumbotron.stories";

export default function HomeV2() {
    return (
        <div className="h-full w-full overflow-clip bg-dark-background-default font-inter">
            <Navigation />
            <FirstJumbotron />
            <SecondJumbotron />
            <ThirdJumbotron />
        </div>
    );
}
