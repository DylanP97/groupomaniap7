import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { createGlobalStyle } from 'styled-components'
import { isEmpty } from "./assets/utils/Utils";

import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile';
import Users from './pages/Users';
import Notification from './pages/Notification';
import './assets/styles/index.css';
import Log from "./components/Log";
import { Loader } from "./assets/styles/Loader";


const GlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
    body {
      margin: 0;
    }
`

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersReducer);


  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

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
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      {isLoading ? (
          <Loader/>
        ) : (
          <>
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
            <Log signin={false} signup={true} />
            }
         </>
        )}
    </UidContext.Provider>
  )
}

export default App;