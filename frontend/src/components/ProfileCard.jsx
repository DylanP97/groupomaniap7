import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { isEmpty } from "../assets/utils/Utils";
// import { UidContext } from "./AppContext";
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

    const editUser = async (e) => {
        e.preventDefault();

        console.log(userData._id)
        console.log(file)
        console.log(picture)
        console.log(pseudo)
        console.log(email)
        console.log(password)
        console.log(job)
        console.log(bio)

      if (picture || pseudo || email || password || job || bio) {
        const data = new FormData();
        // data.append('posterId', userData._id);
        if (pseudo) data.append('pseudo', pseudo);
        if (email) data.append('email', email);
        data.append('password', userData.password);
        data.append('isAdmin', userData.isAdmin);
        if (file) data.append("imageUrl", file);
        if (job) data.append('job', job);
        if (bio) data.append('bio', bio);

        await dispatch(updateUser(data, userData._id));
        dispatch(getUsers());
        cancelUser();
      } else {
        alert("Veuillez entrer un message")
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
            <div className="CurrentProfileDiv">
                <p>Votre Photo de profil : <img className="ProfileImg" src={user.imageUrl} alt={user.imageUrl}/></p>
                <p>Votre Pseudo : "{user.pseudo}"</p>
                <p>Votre Email : "{user.email}"</p>
                <p>Votre Métier : "{user.job}"</p>
                <p>Votre Bio : "{user.bio}"</p>
            </div>
            <div className="UpdateUserDiv">
                <h3>Modifier votre Profil :</h3>
                <form action="" className="UpdateUserForm" >
                    <label className="" htmlFor="file">Image</label>
                    <input className="image-upload" type="file" id="file" accept=".jpg, .jpeg, .png" onChange={event => {
                          const file = event.target.files[0]; setFile(file); setPicture(URL.createObjectURL(file));
                    }}></input>
                    <label className="labelSignForm" htmlFor="pseudo">Pseudo</label>
                    <input className="inputSignForm" type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} placeholder="Pseudo" />
                    <label className="labelSignForm" htmlFor="email">Email</label>
                    <input className="inputSignForm" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                    <label className="labelSignForm" htmlFor="password">Mot de passe</label>
                    <input className="inputSignForm" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de Passe" />

                    <label className="labelSignForm" htmlFor="job">Job</label>
                    <input className="inputSignForm" type="text" name="job" id="job" onChange={(e) => setJob(e.target.value)} value={job} placeholder="Job" />
                    <label className="labelSignForm" htmlFor="bio">Bio</label>
                    <input className="inputSignForm" type="text" name="bio" id="bio" onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Bio" />
                    <button className="btn" onClick={cancelUser}>Annuler message </button>
                    <button className="btn" onClick={editUser}>Envoyer</button>            
                </form>
            </div>
        </div>
    )

}

export default ProfileCard;