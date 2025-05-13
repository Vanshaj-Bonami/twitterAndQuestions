import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, IUser } from "../types";
import { showToast } from "../utils";
import { getCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);
// createContext returns a object that we can use to provide context to the component tree

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    // session hydration
    const hydrateUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response && response.success) {
                setUser(response?.data)
            }
        } catch (error: any) {
            if (error.response?.status == 401) {
                showToast("error", error?.message || "Authentication Failed");
                setUser(null);
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        // hydrateUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}