import PostCreate from "./PostCreate";
import { useEffect, useState } from "react";
import { getTweets } from "../apiCalls/tweet";
import { ITweet } from "../types";

export default function MainSection() {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const response = await getTweets();
        setTweets(response.data);
    }
    console.log(tweets);
    useEffect(() => {
        fetchTweets();
    }, []);
    return (
        <div>
            <div className="text-2xl font-black border-b border-gray-200 py-4 px-3">
                Home
            </div>
            <PostCreate />
            {tweets.map((tweet) => (
                <div className="px-4 py-3 border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-100" key={tweet._id}>
                    <div className="flex gap-2 items-center">
                        <img className="rounded-full w-12 h-12" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
                        <div>
                            <div className="flex gap-1 items-center">
                                <span className="font-bold text-lg hover:underline">{tweet?.author?.fullname}</span>
                                <span className="text-gray-500 text-md">{"@" + tweet?.author?.username}</span>
                            </div>
                            <p className="text-lg">{tweet?.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}