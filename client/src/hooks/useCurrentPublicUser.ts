import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import useCurrentUser from "../hooks/useCurrentUser.ts";

export default function useCurrentPublicUser(): Parse.Object | null {
  const [publicUser, setPublicUser] = useState<Parse.Object | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPublicUser = async () => {
      if (currentUser) {
        const publicUserPointer = currentUser.get("publicUserId");
        if (publicUserPointer) {
          try {
            const publicUserData = await publicUserPointer.fetch();
            setPublicUser(publicUserData);
          } catch (error) {
            console.error("Error fetching public user:", error);
          }
        }
      }
    };
    fetchPublicUser();
  }, [currentUser]);

  return publicUser;
}
