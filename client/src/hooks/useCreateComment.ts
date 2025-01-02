import Parse from "../env.Backend/env.parseConfig.ts";
import {useState} from "react";
import {IComment} from "../Interface.ts";
import {toast} from "react-toastify";

type ICommentInput = Pick<IComment, "EventId" | "Comment">;

export const useCreateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState<IComment>();

  const createComment = async (params: ICommentInput) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await Parse.Cloud.run("createComment", params);
      console.log(response.comment.toJSON())

      const test = response.comment.toJSON();

      const formattedComment: IComment = {
        objectId: test.objectId,
        UserId: test.UserId.objectId, // Assuming UserId is a pointer
        Date: test.Date,
        createdAt: test.createdAt,
        EventId: test.EventId.objectId, // Assuming EventId is a pointer
        Comment: test.Comment,
        PublicUser: test.UserId.objectId, // Assuming PublicUser's username is needed
      };
      console.log(formattedComment);
      setComment(formattedComment)
      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating event:", err.message);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
      toast.success("Comment created");
    }
  };

  return {createComment, comment, loading, error, success};
};