import PostCreate from "./PostCreate";

export default function MainSection(){
    return (
        <div>
            <div className="text-2xl font-black border-b border-gray-200 py-4 px-3">
                Home
            </div>
            <PostCreate/>
        </div>
    )
}