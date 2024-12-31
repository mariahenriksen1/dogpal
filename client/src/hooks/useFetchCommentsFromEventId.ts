import {useState, useEffect} from "react";
import Parse from "../env.Backend/env.parseConfig.ts";
import {Comment} from "../Interface.ts";

interface useFetchCommentsFromEventIdReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export const useFetchCommentsFromEventId = (
  eventId: string | undefined
): useFetchCommentsFromEventIdReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setComments([]);
      setLoading(false);
      setError(null);
      return;
    }

    // Wrapping in an IIFE to avoid returning Promise directly
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const Comment = Parse.Object.extend("Comment");
        const query = new Parse.Query(Comment);
        query.equalTo("EventId", eventId);
        const results = await query.find();

        const fetchedComments = results.map((comment: Comment) => ({
          objectId: comment.objectId,
          UserId: comment.UserId,
          Date: comment.Date,
          EventId: comment.EventId,
          Comment: comment.Comment,
        }));

        setComments(fetchedComments);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching comments.");
        } else {
          setError("An unknown error occurred while fetching comments.");
        }
      }
    })();
  }, [eventId]);

  return {comments, loading, error};
};