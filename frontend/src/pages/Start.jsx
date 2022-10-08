import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Home from "./Home";

const Start = () => {
  const uid = useContext(UidContext);

  return (
    <div>
        {uid ? <Home /> : <Log signin={true} signup={false} />}
    </div>
  );
};

export default Start;