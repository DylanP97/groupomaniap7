import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post";
import HeartIcon from '../../assets/styles/Icons/heart.png';
import HeartFilledIcon from '../../assets/styles/Icons/heart-filled.png';

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false);
  };

  useEffect(() => {
    if (post.usersLiked.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.usersLiked, liked]);

  return (
    <div className="like-container">
      {uid === null && (
        console.log("s")
        // <Popup
        //   trigger={<img src={HeartIcon} alt="HeartIcon" />}
        //   position={["bottom center", "bottom right", "bottom left"]}
        //   closeOnDocumentClick >
        //   <div>Connectez-vous pour aimer un post !</div>
        // </Popup>
      )}
      {uid && liked === false && (
        <img className="imgIcons" src={HeartIcon} onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img className="imgIcons" src={HeartFilledIcon} onClick={unlike} alt="unlike" />
      )}
      <span>{post.usersLiked.length}</span>
    </div>
  );
};

export default LikeButton;