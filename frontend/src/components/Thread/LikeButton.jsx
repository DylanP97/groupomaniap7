import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { UidContext } from "../AppContext";
import { likePost, unlikePost } from "../../actions/post";

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
    <div className="likeSection">
      {uid === null && (
        console.log("uid est null")
      )}
      {uid && liked === false && (
        <i onClick={like} className="fa-regular fa-lg fa-heart"></i>
      )}
      {uid && liked && (
        <i onClick={unlike} className="fa-solid fa-lg fa-heart" style={{color:"red"}}></i>
      )}
      <span>{post.usersLiked.length}</span>
    </div>
  );
};

export default LikeButton;