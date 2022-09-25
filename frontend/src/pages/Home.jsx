import React from "react";
import { useSelector } from "react-redux";

import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <>
            <h3>Bonjour {userData.pseudo} ! 👋</h3>
            <NewPostForm />
            <Thread />
        </>

    )

}

export default Home;