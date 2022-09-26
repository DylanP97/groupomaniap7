import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { createGlobalStyle } from 'styled-components'

import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile';
import Users from './pages/Users';
import Notification from './pages/Notification';
import './assets/styles/index.css';
import Log from "./components/Log";


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
          console.log(res.data)
          setUid(res.data);
        })
        .catch((err) => console.log("No token in app"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
        <GlobalStyle />

        {uid ?
        <>
          <Header />
          <div className="bodyContent">
            <Routes>
              <Route index element={<Home />}/>
              <Route path="/" element={<Home />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/users" element={<Users />}/>
              <Route path="/notification" element={<Notification />}/>
            </Routes > 
          </div>
        </>
         :
         <Log signin={true} signup={false} />}

    </UidContext.Provider>
  )
}

export default App;