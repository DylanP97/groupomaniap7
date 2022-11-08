import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteComment, editComment } from "../../actions/post";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      } else if (userData.isAdmin === true) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId, userData.isAdmin]);

  return (
    <div>
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)} className="interact">
          Edit comment
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            <span className="interact">Cancel</span>
          </label>
          <br />
          <input className="leaveComment__Field" type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div className="CommentEditFooter">
            <span onClick={() => {
                if (window.confirm("Do you want to delete this comment?")) {
                  handleDelete();
                }
              }} className="interact">Delete
            </span>
            <input className="btn sendPost" type="submit" value="Send" ></input>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;