import React from "react";
import { useDispatch } from "react-redux";

import { deletePost } from "../../actions/post";


const CardDelete = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div className="dropdown-list" onClick={() => {
        if (window.confirm("Do you want to delete this post?")) {
          deleteQuote(); }}}>
      <p>Delete post</p>
    </div>
  );
};

export default CardDelete;