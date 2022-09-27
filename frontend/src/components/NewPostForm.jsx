import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../actions/post";
import styled from 'styled-components'
import colors from "../assets/styles/colors";
import ImageIcon from "../assets/styles/Icons/image-gallery.png"

const NewPostContainer = styled.div`
    border-radius: 20px;
    text-align: center;
    padding: 15px;
    margin: 0px 40px 20px 40px;
    background-color: white;
    box-shadow: 0px 0px 7px ${colors.tertiary};
`


const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`

const NewPostForm = () => {

  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  
  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append("imageUrl", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message")
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };



  // {message || postPicture || video.length > 20 ? (
  //   <li className="card-container">
  //   </li>
  // ) : null}


  return (
        <NewPostContainer>
          <textarea name="message" id="message" placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)} value={message} />
          <label htmlFor="file">
            <Icons src={ImageIcon} alt="img-icon"/>
          </label>
          <input className="image-upload" type="file" id="file" accept=".jpg, .jpeg, .png" onChange={event => {
            const file = event.target.files[0]; setFile(file); setPostPicture(URL.createObjectURL(file));
          }}></input>
          <button className="btn" onClick={cancelPost}>Annuler message </button>
          <button className="btn" onClick={handlePost}>Envoyer</button>
        </NewPostContainer>
  );
};

export default NewPostForm;