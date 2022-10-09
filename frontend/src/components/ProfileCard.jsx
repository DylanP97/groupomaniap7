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
        console.log(file)
        setFile(file);
        setPicture(URL.createObjectURL(image.target.files[0]));
        console.log(file)
    }

    const removeImage = async (e) => {
        e.preventDefault();
        const data = new FormData();
        console.log(data)
        data.append("imageUrl", "./uploads/profil/random-user.png");
        await dispatch(updateUser(data, userData._id));
    }

    const editUser = async (e) => {
        e.preventDefault();

      if (picture || pseudo || email || password || job || bio) {
        const data = new FormData();
        // data.append('posterId', userData._id);
        pseudo ? data.append('pseudo', pseudo) : data.append('pseudo', userData.pseudo)
        email ? data.append('email', email) : data.append('email', userData.email)
        // password ? data.append('password', password) : data.append('password', userData.password)
        data.append('isAdmin', userData.isAdmin);
        if (file) data.append("imageUrl", file);
        job ? data.append('job', job) : (userData.job ? data.append('job', userData.job) : data.delete ('job', userData.job))
        bio ? data.append('bio', bio) : (userData.bio ? data.append('bio', userData.bio) : data.delete ('bio', userData.bio))

        await dispatch(updateUser(data, userData._id));
        dispatch(getUsers());
        cancelUser();
      } else {
        alert("Vous n'avez rien modifié")
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

        <div className="ProfileCardContainer" key={user._id}>
            <form action="" className="UpdateUserForm" >
                <div className="profileInput">
                    <p>Photo de profil : </p>
                    <div>
                    <label className="labelProfileForm" htmlFor="file">
                    <img className="ProfilePageImg" src={user.imageUrl} alt={user.imageUrl}></img>
                    </label>
                    <input onChange={img => handleImage(img)} className="inputProfileForm inputImgProfile" type="file" id="file" accept=".jpg, .jpeg, .png"/>
                    <button className="btn" onClick={removeImage}>Supprimer la photo</button>
                    </div>
                </div>
                <div className="profileInput">
                    <p>Pseudo : "{user.pseudo}"</p>
                    <label className="labelProfileForm" htmlFor="pseudo"/>
                    <input className="inputProfileForm" type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} placeholder={user.pseudo} />
                </div>
                <div className="profileInput">
                    <p>Email : "{user.email}"</p>
                    <label className="labelProfileForm" htmlFor="email"/>
                    <input className="inputProfileForm" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder={user.email}/>
                </div>
                <div className="profileInput">
                    <p>Métier : "{user.job}"</p>
                    <label className="labelProfileForm" htmlFor="job"/>
                    <input className="inputProfileForm" type="text" name="job" id="job" onChange={(e) => setJob(e.target.value)} placeholder={user.job} />
                </div>
                <div className="profileInput">
                    <p>Bio : "{user.bio}"</p>
                    <label className="labelProfileForm" htmlFor="bio"/>
                    <textarea className="inputProfileForm textbio" type="text" name="bio" id="bio" onChange={(e) => setBio(e.target.value)} placeholder={user.bio} />
                </div>
                <div className="ProfileBtnDiv">
                    <button className="btn" onClick={cancelUser}>Annuler les modifications</button>
                    <button className="btn" onClick={editUser}>Valider les modifications</button>            
                </div>
            </form>
        </div>
    )

}

export default ProfileCard;