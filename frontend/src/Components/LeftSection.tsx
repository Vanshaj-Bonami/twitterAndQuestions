import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBell as faBellRegular, faEnvelope, faGear, faHouse, faMagnifyingGlass, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Input";
import { useAuth } from "../Context";

const sideBar = [
    {
        id: 1,
        icon: faHouse,
        title: "Home"
    },
    {
        id: 2,
        icon: faMagnifyingGlass,
        title: "Explore"
    },
    {
        id: 3,
        icon: faBellRegular,
        title: "Notifications"
    },
    {
        id: 4,
        icon: faEnvelope,
        title: "Messages"
    },
    {
        id: 5,
        icon: faRobot,
        title: "Grok"
    },
    {
        id: 6,
        icon: faUser,
        title: "Profile"
    },
    {
        id: 7,
        icon: faGear,
        title: "Settings"
    },
]

export default function LeftSection() {
    const { user, loading } = useAuth();

    if (loading || !user) return <div>....loading</div>

    console.log(user, "user in left section")
    return (<>
        <div className="flex flex-col gap-1 justify-between h-screen">
            <div className="flex flex-col gap-1">
                <div className="w-16 p-4 flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-all rounded-full">
                    <FontAwesomeIcon className="text-3xl" icon={faXTwitter} />
                </div>
                <div className="flex flex-col gap-1">
                    {
                        sideBar.map((item) => (
                            <div key={item.id} className="flex items-center gap-5 px-5 py-4 hover:bg-gray-100 cursor-pointer transition-all rounded-2xl">
                                <FontAwesomeIcon className="text-2xl" icon={item.icon} />
                                <span className="text-2xl">{item.title}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="px-5 py-5">
                    <Button label="Post" />
                </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-7">
                <div className="avatar w-16">
                    <img className="rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg">{user.fullname}</span>
                </div>
            </div>
        </div>
    </>)
}