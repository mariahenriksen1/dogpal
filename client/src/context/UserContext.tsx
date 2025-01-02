import React, {createContext, useState, useEffect, useContext, ReactNode} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import useCurrentPublicUser from "../hooks/useCurrentPublicUser";
import {useCurrentUserAndDogs} from "../hooks/useCurrentUserAndDogs.ts";

interface Dog {
  objectId: string;
  name: string;
  dogPicture?: string;
  race?: string;
  dogBirthDate?: string | Date;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Define the context type
interface UserContextType {
  publicUser: Parse.Object | null; // Public user object
  dogs: Dog[]; // Dog data array
  loadingDogs: boolean; // Loading state for dogs
  setPublicUser: React.Dispatch<React.SetStateAction<Parse.Object | null>>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider props
interface UserProviderProps {
  children: ReactNode;
}

// Provider implementation
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [publicUser, setPublicUser] = useState<Parse.Object | null>(null);
  const {dogs, loading: loadingDogs} = useCurrentUserAndDogs(); // Fetch dogs using hook
  const fetchedPublicUser = useCurrentPublicUser(); // Fetch public user

  // Sync public user state
  useEffect(() => {
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

// Custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
