import {ReactNode} from "react";
import {useUser} from "../../context/UserContext.tsx"; // Import ReactNode type

interface RequireUnauthProps {
  children: ReactNode;
}

export default function RequireUnauth({children}: RequireUnauthProps) {
  const currentUser = useUser().publicUser !== null;

  if (currentUser) {
    return null
  }

  return <>{children}</>;
}