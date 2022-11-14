import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'

import { addComment, getPosts } from "../../actions/post";
import { isEmpty, timestampParser } from "../../assets/utils/Utils";
import EditDeleteComment from "./EditDeleteComment";


const ProfileImg = styled.img`
    height: 30px;
    clip-path: circle();
    margin: 0px 10px 0px 0px;
`

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(''));
    }
  };

  return (
    <div className="allComments">
      {post.comments.map((comment) => {
        return (
          <div className="comment"
            key={comment._id}>
              <div className="comment__upperDiv">
                <div className="comment__upperLeftDiv">
                  <ProfileImg
                      src={
                      !isEmpty(usersData[0]) &&
                      usersData
                          .map((user) => {
                          if (user._id === comment.commenterId) return process.env.REACT_APP_API_URL + user.imageUrl;
                          else return null;
                          })
                          .join("")
                      }
                      alt="commenter-pic"
                  />
                  <h3>{comment.commenterPseudo}</h3>
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
            <p>{comment.text}</p>
            <EditDeleteComment comment={comment} postId={post._id} />
          </div>
        );
      })}
      {userData._id && (
        <form className="leaveComment" action="" onSubmit={handleComment}>
          <div className="leaveComment__upperDiv">
            <ProfileImg
              src={process.env.REACT_APP_API_URL + userData.imageUrl}
              alt="commenter-pic"
            />
            <input className="leaveComment__field" type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Leave a comment"/>
          </div>
          <div className="leaveComment__btn">
            <input className="btn" type="submit" value="Send" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CardComments;