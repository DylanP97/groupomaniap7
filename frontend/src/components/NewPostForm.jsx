import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../actions/post";
import styled from 'styled-components'
import colors from "../assets/styles/colors";


const NewPostContainer = styled.div`
    font-size: 1.2rem;
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

  
  const handlePost = async () => {
    if (message) {
      const data = new FormData();
      data.append('posterId', "6324b1170ef0d7bbc924c4c2");
      data.append('message', message);
      data.append("imageUrl", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
    } else {
      alert("Veuillez entrer un message")
    }
  };



  return (
    <div>
      <>
        <h2>NewPostForm</h2>
        <NewPostContainer>
          <textarea name="message" id="message" placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)} value={message} />
          <div>
            <label htmlFor="file">File</label>
            <input type="file" id="file" accept='.jpg' onChange={event => {
              const file = event.target.files[0];
              setFile(file);
            }}></input>
          </div>
          <button onClick={handlePost}>Envoyer</button>
        </NewPostContainer>
      </>
    </div>
  );
};

export default NewPostForm;