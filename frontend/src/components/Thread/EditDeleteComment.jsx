import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post";
import { UidContext } from "../AppContext";
import styled from 'styled-components'
import EditIcon from "../../assets/styles/Icons/edit.png"
import DeleteIcon from '../../assets/styles/Icons/delete.png'


const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`


const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

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
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div>
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
            Editer mon commentaire
            {/* <Icons src={EditIcon} alt="EditIcon"/> */}
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            <span>Annuler l'édition</span>
            {/* <Icons src={EditIcon} alt="EditIcon"/> */}
          </label>
          <br />
          <input className="leaveCommentField" type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div>
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >Supprimer
                {/* <Icons src={DeleteIcon} alt="DeleteIcon"/> */}
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;