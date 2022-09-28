import React, { useState } from "react";
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post";
import { isEmpty, timestampParser } from "../../assets/utils/Utils";
import EditDeleteComment from "./EditDeleteComment";


const ProfileImg = styled.img`
    height: 30px;
    clip-path: circle();
    margin: 0px 20px 0px 20px;
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
            // className={
            //   comment.commenterId === userData._id
            //     ? "comment-container client"
            //     : "comment-container"
            // }
            key={comment._id}
          >

            <div>
              <div>
                <div className="comment__UpperDiv">
                    <ProfileImg
                        src={
                        !isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                            if (user._id === comment.commenterId) return user.imageUrl;
                            else return null;
                            })
                            .join("")
                        }
                        alt="commenter-pic"
                    />
                    <h3>{comment.commenterPseudo}</h3>
                    {/* {comment.commenterId !== userData._id && (
                        <FollowHandler
                        idToFollow={comment.commenterId}
                        type={"card"}
                        />
                    )} */}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form className="leaveComment" action="" onSubmit={handleComment}>
          <input className="leaveComment__Field" type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire"/>
          <br />
          <div className="leaveComment__Btn">
            <input className="spanBtnSubmit" type="submit" value="Envoyer" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CardComments;