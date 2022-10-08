import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {

    const userData = useSelector((state) => state.userReducer);


    return (
        <>
            <Header />
            <h3>Salut {userData.pseudo} ! 👋 Quoi de neuf aujourd'hui ?</h3>
            <NewPostForm />
            <Thread />
        </>

    )

}

export default Home;