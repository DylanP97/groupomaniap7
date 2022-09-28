import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post";
import DeleteIcon from '../../assets/styles/Icons/delete.png'
import styled from 'styled-components'


const Icons2 = styled.img`
    height: 20px;
    margin: 0px 0px 0px 0px;
`

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