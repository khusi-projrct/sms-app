import { useAuth } from "../context/AuthContext";

export default function PermissionGuard({ permission, children }) {
    const { permissions, loading } = useAuth();

    if (loading) return null; // or loader later

    if (!permissions?.includes(permission)) {
        return null; // or <Unauthorized />
    }

    return children;
}