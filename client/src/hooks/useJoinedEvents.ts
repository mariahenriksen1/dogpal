import {useState, useEffect} from "react";
import Parse from "../env.Backend/env.parseConfig";
import {useUser} from "../context/UserContext";
import {Event} from "../Interface.ts";

export const useJoinedEvents = () => {
  const {publicUser} = useUser();
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (!publicUser) {
        setError("User not logged in or public profile not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response: {
          success: boolean;
          events: {
            objectId: string;
            id: string;
            title: string;
            description: string;
            date: string;
            location: string;
            price: number;
            coverImage: string;
            startTime: string;
            endTime: string;
            creatorId: string;
            createdAt: string;
            updatedAt: string;
          }[];
        } = await Parse.Cloud.run("getJoinedEvents", {publicUserId: publicUser.objectId});

        if (response.success) {
          const events: Event[] = response.events.map((event) => ({
            objectId: event.objectId || "",
            id: event.id || "",
            image: event.coverImage || "https://via.placeholder.com/150",
            title: event.title || "Untitled Event",
            date: event.date || new Date().toISOString(), // Fallback to current date
            description: event.description || "No description available.",
            price: event.price,
            location: event.location || "Unknown location",
            participantLimit: undefined, // Assuming not provided in response
            coverImage: event.coverImage || "",
            startTime: event.startTime || "TBD",
            endTime: event.endTime || "TBD",
            creatorId: event.creatorId || "",
            createdAt: event.createdAt || new Date().toISOString(),
            updatedAt: event.updatedAt || new Date().toISOString(),
          }));

          setJoinedEvents(events);
        } else {
          setError("Failed to fetch joined events.");
        }
      } catch (err) {
        setError(`Error fetching joined events: ${(err as any).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [publicUser]);

  return {joinedEvents, loading, error};
};