import LeftSection from "../../Components/LeftSection";
import MainSection from "../../Components/MainSection";
import RightSection from "../../Components/RightSection";

export default function Home() {
    return (
        <main className="flex flex-row h-screen px-[15%]">
            <div className="left-section w-[20%] border-r border-gray-200 px-3 pt-1">
                <LeftSection/>
            </div>
            <div className="mid-section w-[50%] bg-white p-6">
                <MainSection/>
            </div>
            <div className="right-section w-[30%] border-l border-gray-200 px-3 py-4">
                <RightSection/>
            </div>
        </main>
    )
}