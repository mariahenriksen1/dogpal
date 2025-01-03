import {useEffect, useState} from "react";
import Parse from "../env.Backend/env.parseConfig";
import {Dog, PublicUser} from "../Interface.ts";

export const useUserAndDogs = (publicUserId: string) => {
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndDogs = async () => {
      if (!publicUserId) {
        console.log("No userId provided");
        setLoading(false);
        return;
      }

      try {
        const response: {
          publicUser: PublicUser,
          dogs: Dog[]
        } = await Parse.Cloud.run("getPublicUserAndDogs", {publicUserId});
        
        setPublicUser(response.publicUser);
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
  }, [publicUserId]);

  return {publicUser, dogs, loading};
};