import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";

export default function useCurrentUser(): Parse.User | null {
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await Parse.User.currentAsync();
      if (user !== null) {
        console.log("Success!", `${user} is the current user!`);
        console.log("User JSON:", user.toJSON());
      } else {
        console.log("No current user found.");
      }
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

  return currentUser;
}
