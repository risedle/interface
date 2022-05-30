import { useWindowSize } from "../../../../../utils/useWindowSize";

function ThirdSectionImage() {
    const size = useWindowSize();
    if (size.width && size.width > 768) {
        return <div className={`-mx-16 h-[${size.width > 1300 ? "800px" : size.width > 1000 ? "600px" : "500px"}] w-screen bg-contain bg-left bg-no-repeat`} style={{ backgroundImage: `url(/assets/images/homepage/section-3.svg)` }} />;
    }
    return <div className="mt-8 h-[400px] w-screen bg-center bg-no-repeat" style={{ backgroundImage: `url(/assets/images/homepage/section-3-small.svg)` }} />;
}

export { ThirdSectionImage };
