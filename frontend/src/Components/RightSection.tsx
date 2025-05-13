import { Button } from "./Input";

export default function RightSection() {
    return (<>
        <div className="flex flex-col gap-4 justify-between">
            <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 p-3 rounded-full focus:outline-none transition-all"
            />
            <div className="px-5 py-5 border border-gray-200 rounded-2xl">
                <div className="text-2xl w-full font-black pb-6">You might like</div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="avatar w-16">
                                <img className="rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">User Name</span>
                                <span className="text-sm">@username</span>
                            </div>
                        </div>
                        <div>
                            <Button label="Follow" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="avatar w-16">
                                <img className="rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">User Name</span>
                                <span className="text-sm">@username</span>
                            </div>
                        </div>
                        <div>
                            <Button label="Follow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}