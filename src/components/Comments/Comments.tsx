import style from "./Comments.module.css";
import {useFetchCommentsFromEventId} from "../../hooks/useFetchCommentsFromEventId.ts";
import Comment from "../Comment/Comment.tsx";
import Input from "../Input/Input.tsx";
import {useEffect, useState} from "react";
import {useCreateComment} from "../../hooks/useCreateComment.ts";
import {IComment} from "../../Interface.ts";
import RequireAuth from "../Auth/RequireAuth.tsx";

export default function Comments({eventId}: { eventId: string }) {
  const {comments: fetchedComments, reFetch} = useFetchCommentsFromEventId(eventId);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const {createComment, success} = useCreateComment();


  // Sync local state with fetched comments when component mounts
  useEffect(() => {
    setComments(fetchedComments);
  }, [fetchedComments]);

  useEffect(() => {
    if (success) {
      reFetch(); // Refetch comments from the server
    }
  }, [success, reFetch]);

  const handleCommentChange = (value: string) => {
    setNewComment(value);
  };

  const handleSubmit = async () => {
    if (newComment.trim() === '') {
      console.error("Comment cannot be empty");
      return;
    }

    try {
      await createComment({
        Comment: newComment,
        EventId: eventId
      });
      setNewComment('');
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h2>Comments</h2>
        <div className={style.comments}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.objectId} className="comment">
                <Comment comment={comment}/>
              </div>
            ))
          ) : (
            <p>Be the first to give a woof!</p>
          )}
        </div>
        <RequireAuth>
          <Input
            placeholder="Write a comment here"
            value={newComment}
            onChange={handleCommentChange}
            onEnterPress={handleSubmit}
          />
        </RequireAuth>
      </div>
    </>
  );
}