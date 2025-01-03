import { useState } from "react";
import Parse from "../env.Backend/env.parseConfig";
import { useUser } from "../context/UserContext";

interface JoinEventResponse {
  success: boolean;
  message: string;
}

export const useJoinEvent = () => {
  const { publicUser, dogs } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const joinEvent = async (eventId: string) => {
    if (!publicUser) {
      setError("User not logged in or public profile not found.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (process.env.NODE_ENV === "development") {
        console.log("Dogs from context:", dogs);
      }

      const dogAttendees = (dogs || []).map((dog) => ({
        objectId: dog.objectId,
        name: dog.name,
        race: dog.race,
        dogPicture: dog.dogPicture || "", 
      }));

      const response: JoinEventResponse = await Parse.Cloud.run("joinEvent", {
        eventId,
        signUpDate: new Date().toISOString(),
        dogAttendees,
      });

      if (response.success) {
        setSuccess(response.message || "Event joined successfully!");
      } else {
        setError("Failed to join event.");
      }
    } catch (error) {
      setError(`Error joining event: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  return { joinEvent, loading, error, success };
};
