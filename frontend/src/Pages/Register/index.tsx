import { useState } from "react";
import { InputBox } from "../../Components/Input";
import { useAuth } from "../../Context";
import { RegisterUser } from "../../apiCalls/users";
import { showToast } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    })

    const handleClear = () => {
        setRegisterFormData({
            username: "",
            fullname: "",
            email: "",
            password: ""
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRegisterFormData({ ...registerFormData, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await RegisterUser(registerFormData)
            if(response && response.success){
                setUser(response?.data)
                handleClear();
                showToast("success", response?.message || "User registered successfully");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            showToast("error", (error as Error)?.message || "Something went wrong");
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 w-full">
            <div className="flex flex-col gap-3 bg-white p-10 shadow-lg rounded-lg w-1/4">
                <h2 className="text-2xl text-center font-bold">Register</h2>
                <InputBox label="User Name" type="text" name="username" value={registerFormData.username} onChange={handleChange} />
                <InputBox label="Full Name" type="text" name="fullname" value={registerFormData.fullname} onChange={handleChange} />
                <InputBox label="Email" type="email" name="email" value={registerFormData.email} onChange={handleChange} />
                <InputBox label="Password" type="password" name="password" value={registerFormData.password} onChange={handleChange} />
                <button className="bg-blue-500 text-white py-2 rounded" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}
