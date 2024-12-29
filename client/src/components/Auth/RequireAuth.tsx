import { ReactNode } from "react";
import {useUser} from "../../context/UserContext.tsx"; // Import ReactNode type

interface RequireAuthProps {
    children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const currentUser = useUser().publicUser !== null;

    if (!currentUser) {
        return null
    }
    return <>{children}</>;
}