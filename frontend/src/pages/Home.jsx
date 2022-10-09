import React, { useContext } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useSelector } from "react-redux";

import { UidContext } from "../components/AppContext";
import Header from "../components/Header";
import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {

    const userData = useSelector((state) => state.usersReducer);
    const uid = useContext(UidContext);

    console.log(uid)

    const authHeader = useAuthHeader()
    const config = {
        headers: { 
          authorization: authHeader() ,
          "content-type" : "multipart/form-data",
          Accept: FormData
        }
      }


  return (
      <>
          <Header config={config}/>
          <h3>Salut {userData.pseudo} ! 👋 Quoi de neuf aujourd'hui ?</h3>
          <NewPostForm />
          <Thread />
      </>
  )
}

export default Home;