import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost, getPosts } from "../actions/post";
import { isEmpty } from "../assets/utils/Utils";
import { UidContext } from "./AppContext";


const NewPostForm = () => {

  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const uid = useContext(UidContext);

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('posterId', userData._id);
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
    <div className="newPostContainer">
      <div className="newPostContainer__main">
        <img className="profileImg"
          src={
          !isEmpty(usersData[0]) &&
          usersData
              .map((user) => {
              if (user._id === uid) return process.env.REACT_APP_API_URL + user.imageUrl;
              else return null;
              })
              .join("")
          } 
          alt="poster-pic"
        />
        <textarea aria-label="newpostform" name="message" id="message" placeholder="What's new?"
        onChange={(e) => setMessage(e.target.value)} value={message} />
        <label className="uploadImagePart" htmlFor="file">
          <i className="fa-sharp fa-solid fa-lg fa-images" aria-label="Icon-UploadImage"></i>
          <p className="helpText">Add an image</p>
        </label>
        <input className="imageUpload" type="file" id="file" accept=".jpg, .jpeg, .png" onChange={event => {
          const file = event.target.files[0]; setFile(file); setPostPicture(URL.createObjectURL(file));
        }}></input>
      </div>
      <div className="newPostContainer__footer">  
        <button className="btn" onClick={cancelPost}>Cancel</button>
        <button className="btn sendPost" onClick={handlePost}>Send</button>
      </div>
    </div>
  );
};

export default NewPostForm;