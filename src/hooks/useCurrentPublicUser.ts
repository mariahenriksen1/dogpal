import {useState, useEffect} from "react";
import useCurrentUser from "../hooks/useCurrentUser.ts";
import {PublicUser} from "../Interface.ts";

export default function useCurrentPublicUser(): PublicUser | null {
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPublicUser = async () => {
      if (currentUser) {
        const publicUserPointer = currentUser.get("publicUserId");
        if (publicUserPointer) {
          try {
            const publicUserData = await publicUserPointer.fetch();

            // Map the Parse.Object fields to PublicUser interface
            const mappedPublicUser: PublicUser = {
              objectId: publicUserData.id,
              firstName: publicUserData.get("firstName"),
              lastName: publicUserData.get("lastName"),
              profilePicture: publicUserData.get("profilePicture"),
              createdAt: "", updatedAt: "", userId: "", username: publicUserData.get("username"),
            };

            setPublicUser(mappedPublicUser);
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