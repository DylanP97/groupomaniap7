import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../actions/post";
import styled from 'styled-components'
import colors from "../assets/styles/colors";


const NewPostContainer = styled.div`
    border-radius: 20px;
    text-align: center;
    background-color: ${colors.secondary};
    padding: 15px;
    margin: 0px 40px 20px 40px;
    border: 2px solid ${colors.tertiary};
`


const NewPostForm = () => {
  const dispatch = useDispatch();
  
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);

  
  const handlePost = async () => {
    if (message) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      data.append("imageUrl", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
    } else {
      alert("Veuillez entrer un message")
    }
  };



  return (
        <NewPostContainer>
          <textarea name="message" id="message" placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)} value={message} />
          <div>
            <label htmlFor="file"></label>
            <input type="file" id="file" className="inputFile" accept=".jpg, .jpeg, .png" onChange={event => {
              const file = event.target.files[0];
              setFile(file);
            }}></input>
          <button className="btn" onClick={handlePost}>Envoyer</button>
          </div>
        </NewPostContainer>
  );
};

export default NewPostForm;