import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig";
import { useUser } from "../context/UserContext";

interface Event {
  id: string; 
  title: string;
  description: string; 
  date: string; 
  location: string; 
  price: number;
  coverImage: string; 
  startTime: string; 
  endTime: string;
}

export const useJoinedEvents = () => {
  const { publicUser } = useUser();
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
            id: string;
            title: string;
            description: string;
            date: string;
            location: string;
            price: number;
            coverImage: string;
            startTime: string;
            endTime: string;
          }[];
        } = await Parse.Cloud.run("getJoinedEvents", { publicUserId: publicUser.id });

        if (response.success) {
          const events = response.events.map((event) => ({
            id: event.id || "",
            title: event.title || "Untitled Event",
            description: event.description || "No description available.",
            date: event.date || "Unknown date",
            location: event.location || "Unknown location",
            price: event.price || 0,
            coverImage: event.coverImage || "https://via.placeholder.com/150", 
            startTime: event.startTime || "TBD",
            endTime: event.endTime || "TBD",
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

  return { joinedEvents, loading, error };
};
