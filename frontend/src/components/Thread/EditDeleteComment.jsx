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
            Modifier le commentaire
            {/* <Icons src={EditIcon} alt="EditIcon"/> */}
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            <span className="interact">Annuler la modification</span>
            {/* <Icons src={EditIcon} alt="EditIcon"/> */}
          </label>
          <br />
          <input className="leaveComment__Field" type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div className="CommentEditFooter">
            <span onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }} className="interact">Supprimer le commentaire
                {/* <Icons src={DeleteIcon} alt="DeleteIcon"/> */}
            </span>
            <input className="spanBtnSubmit" type="submit" value="Valider modification" ></input>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;