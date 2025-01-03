import {useState, useEffect} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import {PublicUser} from "../Interface.ts";

interface UseFetchPublicUserReturn {
  publicUser: PublicUser | null;
  loading: boolean;
  error: string | null;
}

export const useFetchPublicUser = (userId: string | undefined): UseFetchPublicUserReturn => {
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setPublicUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchPublicUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new Parse.Query("PublicUser");
        const result = await query.get(userId);

        const formattedPublicUser: PublicUser = {
          objectId: result.id,
          username: result.get("username"),
          firstName: result.get("firstName"),
          lastName: result.get("lastName"),
          profilePicture: result.get("profilePicture"),
          createdAt: result.get("createdAt"),
          updatedAt: result.get("updatedAt"),
          userId: result.get("userId"),
        };

        setPublicUser(formattedPublicUser); // Update state with the formatted public user
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching public user:", err.message);
          setError(err.message || "Failed to fetch the public user.");
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicUser();

  }, [userId]); // Dependency array includes userId

  return {publicUser, loading, error};
};