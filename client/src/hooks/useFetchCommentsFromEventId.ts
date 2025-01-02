import {useState, useEffect, useCallback} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import {IComment} from "../Interface.ts";

interface useFetchCommentsFromEventIdReturn {
  comments: IComment[];
  loading: boolean;
  error: string | null;
  reFetch: () => Promise<void>; // Expose the reFetch function
}

interface ParseComment {
  id: string;
  get: (key: string) => any;
}

export const useFetchCommentsFromEventId = (eventId: string | undefined): useFetchCommentsFromEventIdReturn => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!eventId) {
      setComments([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = new Parse.Query("Comment");
      const specificEvent = new Parse.Object("Event");
      specificEvent.id = eventId;
      query.equalTo("EventId", specificEvent);
      const results = await query.find();

      const fetchedComments = await Promise.all(
        results.map(async (comment: ParseComment) => ({
          objectId: comment.id,
          PublicUser: comment.get("UserId").id,
          Date: comment.get("Date"),
          EventId: comment.get("EventId"),
          Comment: comment.get("Comment"),
          createdAt: comment.get("createdAt"),
        }))
      );

      setComments(fetchedComments);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while fetching comments.");
      } else {
        setError("An unknown error occurred while fetching comments.");
      }
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  // Automatically fetch comments on mount or when eventId changes
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {comments, loading, error, reFetch: fetchComments};
};