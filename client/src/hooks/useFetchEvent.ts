import {useState, useEffect} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import {Event} from "../Interface.ts";


interface UseFetchEventReturn {
  event: Event;
  loading: boolean;
  error: string | null;
}

export const useFetchEvent = (eventId: string | undefined): UseFetchEventReturn => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new Parse.Query("Event");
        const result = await query.get(eventId);

        const formattedEvent: Event = {
          id: result.id,
          title: result.get("title"),
          date: result.get("date"),
          description: result.get("description"),
          price: result.get("price"),
          location: result.get("location"),
          participantLimit: result.get("participantLimit"),
          coverImage: result.get("coverImage"),
          image: result.get("coverImage"),
          startTime: result.get("startTime"),
          endTime: result.get("endTime"),
          createdAt: result.get("createdAt"),
          creatorId: "",
          objectId: result.id,
          updatedAt: result.get("updatedAt"),
        };

        setEvent(formattedEvent); // Update state with the formatted event
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching event:", err.message);
          setError(err.message || "Failed to fetch the event.");
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]); // Dependency array includes eventId

  return <UseFetchEventReturn>{event, loading, error};
};

export default useFetchEvent;