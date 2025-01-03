import { useState, useEffect } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";

interface EventData {
  createdAt: string;
  updatedAt: string;
  name: string;
  image: string;
  creator: string;
  id: string;
  title: string;
  date: number; 
  description: string;
  price?: number;
  location?: string;
  participantLimit?: number;
  coverImage?: string;
  startTime: number;
  endTime: number;
}

interface UseFetchEventsReturn {
  events: EventData[];
  loading: boolean;
  error: string | null;
}

export const useFetchEvents = (): UseFetchEventsReturn => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new Parse.Query("Event");
        query.ascending("date");
        const results = await query.find();

        interface ParseEvent {
            id: string;
            get: (key: string) => any;
        }

        const formattedEvents: EventData[] = results.map((event: ParseEvent) => ({
          id: event.id,
          title: event.get("title"),
          date: event.get("date"),
          description: event.get("description"),
          price: event.get("price"),
          location: event.get("location"),
          participantLimit: event.get("participantLimit"),
          coverImage: event.get("coverImage"),
          image: event.get("coverImage"), 
          startTime: event.get("startTime"),
          endTime: event.get("endTime")
      }));

        setEvents(formattedEvents);
      } catch (err: any) {
        console.error("Error fetching events:", err.message);
        setError(err.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
