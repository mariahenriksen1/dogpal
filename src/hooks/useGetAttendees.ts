import {useState, useEffect} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import {IAttendee} from "../Interface.ts"

export const useGetAttendees = (eventId: string) => {
  const [attendees, setAttendees] = useState<IAttendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the getEventAttendees cloud function
        const response: {
          success: boolean;
          users: IAttendee[]
        } = await Parse.Cloud.run("getEventAttendees", {eventId});

        if (response.success) {
          setAttendees(response.users);
        } else {
          setError("Failed to fetch attendees.");
        }
      } catch (error) {
        setError(`Error fetching attendees: ${(error as any).message}`);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchAttendees();
    }
  }, [eventId]);

  return {attendees, loading, error};
};
