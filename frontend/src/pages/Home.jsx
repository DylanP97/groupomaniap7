import React from "react";
import { useSelector } from "react-redux";

import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <>
            <h3>Bienvenue {userData.pseudo}</h3>
            <NewPostForm />
            <Thread />
        </>

    )

}

export default Home;


// {uid ? (
//     <ul>
//       <li>
//           <h5>Bienvenue {userData.pseudo}</h5>
//       </li>
//       <Logout />
//     </ul>
//   ) : (
//     <ul>
//       <li></li>
//       <li>
//         <NavLink exact to="/profil">
//           <img src="./img/icons/login.svg" alt="login"/>
//         </NavLink>
//       </li>
//     </ul>
//   )}