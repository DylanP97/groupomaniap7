import React, { useContext } from "react";

import { UidContext } from "../components/AppContext";
import Log from "../components/Log"
import Home from "./Home";

const LoginPage = () => {

    const uid = useContext(UidContext);

    console.log(uid ? "true" : "false")

    return (
        <>
            <div>
                {uid ? <Log signin={true} signup={false} /> : <Log signin={false} signup={true} />}
            </div>
        </>

    )

}

export default LoginPage;
