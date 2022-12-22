import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../actions/user";
import { getUsers } from "../actions/users"


const ProfileCard = ({ user }) => {

    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const [picture, setPicture] = useState(null);
    const [file, setFile] = useState();
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
    const [bio, setBio] = useState("");


    const handleImage = (image) => {
        image.preventDefault();
        const file = image.target.files[0]
        setFile(file);
        setPicture(URL.createObjectURL(image.target.files[0]));
        console.log(file)
    }

    const saveImage = async (e) => {
        e.preventDefault();
        const data = new FormData();
        pseudo ? data.append('pseudo', pseudo) : data.append('pseudo', userData.pseudo)
        email ? data.append('email', email) : data.append('email', userData.email)
        if (file) data.append("imageUrl", file);
        await dispatch(updateUser(data, userData._id));
        dispatch(getUsers());
        cancelUser();
    }

    const removeImage = async (e) => {
        e.preventDefault();
        const data = new FormData();
        pseudo ? data.append('pseudo', pseudo) : data.append('pseudo', userData.pseudo)
        email ? data.append('email', email) : data.append('email', userData.email)
        data.append("imageUrl", "./uploads/profil/random-user.png");
        await dispatch(updateUser(data, userData._id));
        dispatch(getUsers());
        cancelUser();
    }

    const editUser = async (e) => {
        e.preventDefault();

      if (picture || pseudo || email || password || job || bio) {
        const data = new FormData();
        pseudo ? data.append('pseudo', pseudo) : data.append('pseudo', userData.pseudo)
        email ? data.append('email', email) : data.append('email', userData.email)
        data.append('isAdmin', userData.isAdmin);
        if (file) data.append("imageUrl", file);
        job ? data.append('job', job) : (userData.job ? data.append('job', userData.job) : data.delete ('job', userData.job))
        bio ? data.append('bio', bio) : (userData.bio ? data.append('bio', userData.bio) : data.delete ('bio', userData.bio))
        await dispatch(updateUser(data, userData._id));
        dispatch(getUsers());
        cancelUser();
      } else {
        alert("There is no changes!")
      }
    };
  
    const cancelUser = (e) => {
        e.preventDefault();
        setPicture("");
        setFile("");  
        setPseudo("")
        setEmail("");
        setPassword("");
        setJob("");
        setBio("");
    }; 


    return (
        <div className="profileCardContainer" key={user._id}>
            <form action="" className="updateUserForm" >
                <div className="profileInput">
                    <p>Profile picture: Click on the profile image to choose a new picture! </p>
                    <label className="labelProfileForm" htmlFor="file">
                        <img className="profilePageImg" src={process.env.REACT_APP_API_URL + user.imageUrl} alt={user.imageUrl}></img>
                        <input onChange={img => handleImage(img)} className="inputProfileForm inputImgProfile" type="file" id="file" accept=".jpg, .jpeg, .png"/>
                        <button className="btn" onClick={removeImage}>Delete photo</button>
                        <button className="btn" onClick={saveImage}>Save photo</button>
                    </label>
                </div>
                <div className="profileInput">
                    <p>Username: "{user.pseudo}"</p>
                    <label className="labelProfileForm" htmlFor="pseudo"/>
                    <input className="inputProfileForm" type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} placeholder={user.pseudo} />
                </div>
                <div className="profileInput">
                    <p>Email: "{user.email}"</p>
                    <label className="labelProfileForm" htmlFor="email"/>
                    <input className="inputProfileForm" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder={user.email}/>
                </div>
                <div className="profileInput">
                    <p>Job: "{user.job}"</p>
                    <label className="labelProfileForm" htmlFor="job"/>
                    <input className="inputProfileForm" type="text" name="job" id="job" onChange={(e) => setJob(e.target.value)} placeholder={user.job} />
                </div>
                <div className="profileInput">
                    <p>About me: "{user.bio}"</p>
                    <label className="labelProfileForm" htmlFor="bio"/>
                    <textarea className="inputProfileForm textBio" type="text" name="bio" id="bio" onChange={(e) => setBio(e.target.value)} placeholder={user.bio} />
                </div>
                <div className="profileBtnDiv">
                    <button className="btn" onClick={cancelUser}>Cancel</button>
                    <button className="btn" onClick={editUser}>Save</button>            
                </div>
            </form>
        </div>
    )

}

export default ProfileCard;