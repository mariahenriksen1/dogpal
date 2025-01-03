import React, {createContext, useState, useEffect, useContext, ReactNode} from "react";
import useCurrentPublicUser from "../hooks/useCurrentPublicUser";
import {useCurrentUserAndDogs} from "../hooks/useCurrentUserAndDogs.ts";
import {PublicUser, Dog} from "../Interface.ts";

interface UserContextType {
  publicUser: PublicUser | null;
  dogs: Dog[];
  loadingDogs: boolean;
  setPublicUser: React.Dispatch<React.SetStateAction<PublicUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const {dogs, loading: loadingDogs} = useCurrentUserAndDogs();
  const fetchedPublicUser = useCurrentPublicUser(); // Already typed as PublicUser | null

  useEffect(() => {
    // Simply update the state since `fetchedPublicUser` already matches `PublicUser`
    setPublicUser(fetchedPublicUser);
  }, [fetchedPublicUser]);

  return (
    <UserContext.Provider
      value={{
        publicUser,
        dogs,
        loadingDogs,
        setPublicUser,
      }}
    >
      {children}
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