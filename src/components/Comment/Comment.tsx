import style from "./Comment.module.css"
import {IComment} from "../../Interface.ts";
import {useUserAndDogs} from "../../hooks/usePublicUserAndDogs.ts";


export default function Comment({comment}: { comment: IComment }) {
  const {publicUser, dogs} = useUserAndDogs(comment.PublicUser);

  if (!publicUser) {
    return null
  }

  // Format the date using the event.date field (assumed to be a timestamp in milliseconds)
  const commentDate = new Date(comment.createdAt);
  const dateMonth = commentDate
    .toLocaleString("default", {month: "long"})
  const dateDay = commentDate.getDate();

  return (
    <>
      <div className={style.comment}>
        <div className={style.profile}>
          <div className={style.avatars}>
            <img className={style.userAvatar} src={publicUser.profilePicture} alt={publicUser.username}/>
          </div>
          <div className={style.names}>
            <div className={style.nameDate}>
              <p className={style.name}>{publicUser.firstName + " " + publicUser.lastName}</p>
              <p className={style.created}>{dateMonth + " " + dateDay}</p>
            </div>
            <p className={style.dogs}>{dogs.map((dog) => (
              <span key={comment.objectId + dog.objectId}>{dog.name}</span>
            ))}</p>
          </div>
        </div>

        <div className={style.commentContent}><p>{comment.Comment}</p></div>

      </div>
    </>
  );
}