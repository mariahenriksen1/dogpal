import {useState} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";

export const useSaveEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const saveEvent = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response: { success: boolean; message: string } = await Parse.Cloud.run("useSaveEvent", {eventId});
      console.log(response);
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError("Failed to save the event.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred while saving the event.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {saveEvent, loading, error, success};
};
