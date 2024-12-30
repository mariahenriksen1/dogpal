import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig";
import { Dog, PublicUser } from "../Interface.ts";


export const useUserAndDogs = () => {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndDogs = async () => {
      try {
        const user = Parse.User.current();
        if (!user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        const response = await fetchUserAndDogsFromCloud(user.id);
        setCurrentUser(response.publicUser);
        setDogs(response.dogs);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching user and dogs:", error.message);
        } else {
          console.error("Error fetching user and dogs:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndDogs();
  }, []);

  return { currentUser, dogs, loading };
};

export const fetchUserAndDogsFromCloud = async (userId: string): Promise<{ publicUser: PublicUser, dogs: Dog[] }> => {
  try {
    const response: { publicUser: PublicUser, dogs: Dog[] } = await Parse.Cloud.run("getUserAndDogs", { userId });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching user and dogs: ${error.message}`);
    } else {
      throw new Error("Error fetching user and dogs");
    }
  }
};

// Save user and dogs to Cloud Code
export const saveUserAndDogs = async (userData: any, dogs: any[]) => {
  try {
    const response = await Parse.Cloud.run("saveUserAndDogs", { userData, dogs });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving user and dogs: ${error.message}`);
    } else {
      throw new Error("Error saving user and dogs");
    }
  }
};
