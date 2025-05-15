import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, IUser } from "../types";
import { getCurrentUser } from "../apiCalls/users";
import { showToast } from "../utils";

const AuthContext = createContext<AuthContextType | null>(null);
// createContext returns a object that we can use to provide context to the component tree

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const handleCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response && response.success) {
                setUser(response.data);
            }
        } catch (error) {
            console.error(error);
            showToast("error", (error as Error)?.message || "Something went wrong");
        } finally {
            setLoading(false); 
        }
    };

    console.log(user,"user in context")

    useEffect(() => {
        handleCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}