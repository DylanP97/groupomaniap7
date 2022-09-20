import React, { useContext } from "react";

import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log"

const Home = () => {

    const uid = useContext(UidContext);

    return (
        <>
            <div className="home-header">
                {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
            </div>
            {/* <NewPostForm />  */}
            {/* <Thread /> */}
        </>

    )

}

export default Home;
