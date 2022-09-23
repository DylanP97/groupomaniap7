import React, { useContext } from "react";

import { UidContext } from "../components/AppContext";
import Log from "../components/Log"
import Home from "./Home";

const LoginPage = () => {

    const uid = useContext(UidContext);


    return (
        <>
            {uid ? <Home /> : <Log signin={true} signup={false} />}
        </>

    )

}

export default LoginPage;
