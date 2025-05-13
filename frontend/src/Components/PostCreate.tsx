import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function PostCreate() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState({
        content: "",
        media: []
    });

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent({
            ...content,
            content: e.target.value
        });
    }
    console.log(content);
    const handleFileClick = () => {
        fileInputRef.current?.click();
    }

    const handleCreatePost = () => {
        console.log(content);
    }

    return (
        <div className="flex gap-5 px-3 py-4 border-b border-gray-200">
            <div className="avatar w-17">
                <img className="rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full h-auto border-b border-gray-200">
                    <TextareaAutosize
                        value={content.content}
                        onChange={handleContentChange}
                        minRows={1}
                        maxRows={10}
                        placeholder="What’s happening?"
                        className="w-full rounded-2xl p-3 bg-transparent text-xl resize-none focus:outline-none placeholder-gray-500"
                    />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full p-3 transition-all" onClick={handleFileClick}>
                        <FontAwesomeIcon className="text-xl text-blue-500" aria-hidden="true" icon={faImage} />
                        <input type="file" className="hidden" ref={fileInputRef} />
                    </div>
                    <div>
                        <Button disabled={content.content === ""} label="Post" onClick={handleCreatePost} />
                    </div>
                </div>
            </div>
        </div>
    )
}