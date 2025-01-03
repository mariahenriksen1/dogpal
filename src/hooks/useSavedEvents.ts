import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import { Event } from "../Interface.ts";

export const useSavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        setLoading(true);

        const response: { success: boolean; events: Event[] } = await Parse.Cloud.run("useSavedEvents");

        if (response.success) {
          setSavedEvents(response.events);
        } else {
          setError("Failed to fetch saved events.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching saved events.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);

  return { savedEvents, loading, error };
};
