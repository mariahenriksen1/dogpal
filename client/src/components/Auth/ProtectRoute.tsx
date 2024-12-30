import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useUser} from "../../context/UserContext.tsx";

interface ProtectRouteProps {
  children: ReactNode;
}

export default function ProtectRoute({children}: ProtectRouteProps) {
  const currentUser = useUser().publicUser !== null;

  if (!currentUser) {
    return <Navigate to="/login" replace/>;
  }

  return <>{children}</>;
}