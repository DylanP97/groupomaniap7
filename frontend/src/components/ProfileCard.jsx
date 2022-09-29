import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../assets/utils/Utils";
import { UidContext } from "./AppContext";
import { addPost, getPosts } from "../actions/post";

const ProfileCard = () => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);

    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleUser = async () => {
      if (message || postPicture) {
        const data = new FormData();
        data.append('posterId', userData._id);
        console.log(message);
        message ? data.append('message', message) : data.append('message', '');
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

        <div className="ProfileCardContainer">
            <div>
                <p>
                    {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                        if (user._id === uid) return user.pseudo + " ";
                        else return null;
                    })}
                </p>
                <img className="ProfileImg"
                    src={
                    !isEmpty(usersData[0]) &&
                    usersData
                        .map((user) => {
                        if (user._id === uid) return user.imageUrl;
                        else return null;
                        })
                        .join("")
                    }
                    alt="user-pic"
                />
            </div>
            <div className="UpdateUserDiv">
                <h3>Modifier votre Profil ici : </h3>
                <form action="" className="UpdateUserForm" onSubmit={handleUser}>
                    <label className="labelSignForm" htmlFor="pseudo">Pseudo</label>
                    <input className="inputSignForm" type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} placeholder="Pseudo" />
                    <label className="labelSignForm" htmlFor="email">Email</label>
                    <input className="inputSignForm" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                    <label className="labelSignForm" htmlFor="password">Mot de passe</label>
                    <input className="inputSignForm" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de Passe" />
                    <label htmlFor="file"> <i className="fa-sharp fa-solid fa-lg fa-images"/></label>
                    <input className="image-upload" type="file" id="file" accept=".jpg, .jpeg, .png" onChange={event => {
                        //   const file = event.target.files[0]; setFile(file); setPostPicture(URL.createObjectURL(file));
                    }}></input>
                    <button className="btn" onClick={cancelPost}>Annuler message </button>
                    <button className="btn" onClick={handleUser}>Envoyer</button>            
                </form>
            </div>
        </div>
    )

}

export default ProfileCard;