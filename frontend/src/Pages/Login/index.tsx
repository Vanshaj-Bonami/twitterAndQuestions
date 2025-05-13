import { InputBox } from "../../Components/Input";
import { useAuth } from "../../Context";
import { showToast } from "../../utils";
import { useState } from "react";
import { LoginUser } from "../../apiCalls/users";
import { LoginInput } from "../../types";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState<LoginInput>({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginFormData({ ...loginFormData, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await LoginUser(loginFormData)
            if(response && response.success){
                setUser(response?.data)
                handleClear();
                showToast("success", response?.message || "User logged in successfully");
                navigate("/home")
            }
        } catch (error) {
            console.error(error);
            showToast("error", (error as Error)?.message || "Something went wrong");
        }
    }

    const handleClear = () => {
        setLoginFormData({
            username: "",
            password: ""
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 w-full">
            <div className="flex flex-col gap-3 bg-white p-10 shadow-lg rounded-lg w-1/4">
                <h2 className="text-2xl text-center font-bold">Login</h2>
                <InputBox label="User Name" type="text" name="username" value={loginFormData.username} onChange={handleChange} />
                <InputBox label="Password" type="password" name="password" value={loginFormData.password} onChange={handleChange} />
                <button className="bg-blue-600 text-white py-2 rounded" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}