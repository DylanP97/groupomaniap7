import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { createGlobalStyle } from 'styled-components'

import Profile from './pages/Profile';
import Users from './pages/Users';
import Notification from './pages/Notification';
import './assets/styles/index.css';
import UseTerms from "./pages/UseTerms";
import Start from "./pages/Start";


const GlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
    body {
      margin: 0;
    }
`

const App = () => {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true},
      )
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token in app"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));

    console.log(uid)
  }, [uid, dispatch]);



  return (
    <UidContext.Provider value={uid}>
      <GlobalStyle />
        {/* <div className="bodyContent"> */}
          <Routes>
            <Route path="/" element={<Start />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/users" element={<Users />}/>
            {/* <Route path="/notification" element={<Notification />}/> */}
            {/* <Route path="/useterms" element={<UseTerms/>}/> */}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes > 
        {/* </div> */}
    </UidContext.Provider>
  )
}

export default App;