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

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     await axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_API_URL}jwtid`,
  //       withCredentials: true,
  //     })
  //       .then((res) => {
  //         setUid(res.data);
  //       })
  //       .catch((err) => console.log("No token"));
  //   };
  //   fetchToken();

  //   if (uid) dispatch(getUser(uid));
  // }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/notification" element={<Notification />}/>
        </Routes >
    </UidContext.Provider>
  )
}

export default App;