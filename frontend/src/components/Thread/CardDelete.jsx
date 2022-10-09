import React from "react";
import { useDispatch } from "react-redux";

import { deletePost } from "../../actions/post";


const CardDelete = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div className="dropdown-list" onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote(); }}}>
      <p>Supprimer le post</p>
    </div>
  );
};

export default CardDelete;