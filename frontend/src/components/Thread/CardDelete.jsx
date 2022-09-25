import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post";
import DeleteIcon from '../../assets/styles/Icons/delete.png'
import styled from 'styled-components'


const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`

const CardDelete = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote(); }}}>
      <Icons src={DeleteIcon} alt="DeleteIcon" />
    </div>
  );
};

export default CardDelete;