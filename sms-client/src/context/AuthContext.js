import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Load user on refresh
    useEffect(() => {
        const loadProfile = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await getProfile(token);

                const userData = res.data.user;

                setUser(userData);

                // role comes from user.roles
                setRoles(userData.roles || []);

                // flatten permissions → ["school:create", "school:read"]
                const flatPermissions =
                    userData.permissions?.flatMap(p =>
                        p.actions.map(a => `${p.module}:${a}`)
                    ) || [];

                setPermissions(flatPermissions);

            } catch (err) {
                console.error("Auth failed", err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setRoles([]);
        setPermissions([]);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                roles,
                permissions,
                token,
                isAuthenticated: !!user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
