import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../actions/post";
import styled from 'styled-components'
import colors from "../assets/styles/colors";
import ImageIcon from "../assets/styles/Icons/gallery.svg"


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
      console.log(message);
      message ? data.append('message', message) : data.append('message', ' ');
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


  return (
        <div className="NewPostContainer">
          <div className="NewPostContainer__Main">
            <textarea name="message" id="message" placeholder="Quoi de neuf ?"
            onChange={(e) => setMessage(e.target.value)} value={message} />
            <label htmlFor="file">
              <i className="fa-sharp fa-solid fa-lg fa-images"></i>
            </label>
            <input className="image-upload" type="file" id="file" accept=".jpg, .jpeg, .png" onChange={event => {
              const file = event.target.files[0]; setFile(file); setPostPicture(URL.createObjectURL(file));
            }}></input>
          </div>
          <div className="NewPostContainer__Footer">  
            <button className="btn" onClick={cancelPost}>Annuler message </button>
            <button className="btn sendPost" onClick={handlePost}>Envoyer</button>
          </div>
        </div>
  );
};

export default NewPostForm;