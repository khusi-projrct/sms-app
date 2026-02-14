import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PermissionRoute({ permission, children }) {
    const { permissions, loading } = useAuth();

    if (loading) return null;

    if (!permissions?.includes(permission)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}