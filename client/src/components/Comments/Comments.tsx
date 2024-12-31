import {useFetchCommentsFromEventId} from "../../hooks/useFetchCommentsFromEventId.ts";

export default function Comments({eventId}: { eventId: string }) {

  const {comments, loading, error} = useFetchCommentsFromEventId(eventId);

  console.log(comments, loading, error);

  return (
    <>
      <div className="comments">
        <h2>Comments</h2>
      </div>
    </>
  );
}