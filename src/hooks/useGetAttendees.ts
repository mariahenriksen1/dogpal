import { useState, useEffect, useCallback } from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import { IAttendee } from "../Interface.ts";

export const useGetAttendees = (eventId: string) => {
  const [attendees, setAttendees] = useState<IAttendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the getEventAttendees cloud function
      const response: {
        success: boolean;
        users: IAttendee[];
      } = await Parse.Cloud.run("getEventAttendees", { eventId });

      if (response.success) {
        setAttendees(response.users);
      } else {
        setError("Failed to fetch attendees.");
      }
    } catch (err) {
      setError(`Error fetching attendees: ${(err as any).message}`);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchAttendees();
    }
  }, [eventId, fetchAttendees]);

  return { attendees, loading, error, fetchAttendees };
};
