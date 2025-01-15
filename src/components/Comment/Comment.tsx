import style from "./Comment.module.css";
import { IComment } from "../../Interface.ts";
import { useUserAndDogs } from "../../hooks/usePublicUserAndDogs.ts";
import PreviewImage from "../PreviewImage/PreviewImage"; 
import dogLogo from "../../assets/dogpicLogo.jpg";

export default function Comment({ comment }: { comment: IComment }) {
  const { publicUser, dogs } = useUserAndDogs(comment.PublicUser);

  if (!publicUser) {
    return null;
  }

  const defaultDogPicture = dogLogo;

  const commentDate = new Date(comment.createdAt);
  const dateMonth = commentDate.toLocaleString("default", { month: "long" });
  const dateDay = commentDate.getDate();

  return (
    <div className={style.comment}>
      <div className={style.profile}>
        <div className={style.avatars}>
          <PreviewImage
            src={publicUser.profilePicture || defaultDogPicture}
            alt={publicUser.username}
            pictureSize="50px"
            border="1px solid #ccc"
            verticalOffset="10px" 
          />
        </div>
        <div className={style.names}>
          <div className={style.nameDate}>
            <p className={style.name}>
              {publicUser.firstName + " " + publicUser.lastName}
            </p>
            <p className={style.created}>{dateMonth + " " + dateDay}</p>
          </div>
          <p className={style.dogs}>
            {dogs.map((dog) => (
              <span key={comment.objectId + dog.objectId}>
                <PreviewImage
                  className={style.dogImage}
                  src={dog.dogPicture || defaultDogPicture}
                  alt={dog.name}
                  pictureSize="30px"
                  border="1px solid #ccc"
                  verticalOffset="8px"
                />
                {dog.name}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className={style.commentContent}>
        <p>{comment.Comment}</p>
      </div>
    </div>
  );
}
