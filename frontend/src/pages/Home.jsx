import React from "react";
import { useSelector } from "react-redux";

import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <>
            <h3>Salut {userData.pseudo} ! 👋 Quoi de neuf aujourd'hui ?</h3>
            <NewPostForm />
            <Thread />
        </>

    )

}

export default Home;