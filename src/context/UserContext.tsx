import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import useCurrentPublicUser from "../hooks/useCurrentPublicUser.ts";
import { useCurrentUserAndDogs } from "../hooks/useCurrentUserAndDogs.ts";
import { PublicUser, Dog } from "../Interface.ts";
interface UserContextType {
  publicUser: PublicUser | null;
  setPublicUser: React.Dispatch<React.SetStateAction<PublicUser | null>>;
  dogs: Dog[];
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  loadingDogs: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const { dogs, loading: loadingDogs } = useCurrentUserAndDogs();
  const [setDogs] = useState<React.Dispatch<React.SetStateAction<Dog[]>>>(() => () => {});
  const fetchedPublicUser = useCurrentPublicUser();


  // Fetch public user
  useEffect(() => {
    console.log("Fetching public user...");
    if (fetchedPublicUser !== undefined) {
      setPublicUser(fetchedPublicUser);
      setLoadingUser(false);
    }
  }, [fetchedPublicUser]);

  // Unified loading state
  const loading = loadingUser || loadingDogs;

  // Debugging logs
  useEffect(() => {
    console.log("Public User:", publicUser);
    console.log("Dogs:", dogs);
    console.log("Loading states - User:", loadingUser, "Dogs:", loadingDogs);
  }, [publicUser, dogs, loadingUser, loadingDogs]);

  return (
    <UserContext.Provider
      value={{
        publicUser,
        setPublicUser,
        dogs,
        setDogs,
        loadingDogs,
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
