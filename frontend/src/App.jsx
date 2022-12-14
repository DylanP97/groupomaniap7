import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { isEmpty } from "./assets/utils/Utils";

import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile';
import Users from './pages/Users';
import './assets/styles/index.css';
import Log from "./pages/Log";
import { Loader } from "./assets/styles/Loader";
import UseTerms from "./pages/UseTerms";


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
            {uid ?
            <>
              <Header />
              <div className="bodyContent">
                <Routes>
                  <Route index element={<Home />}/>
                  <Route path="/" element={<Home />}/>
                  <Route path="/profile" element={<Profile />}/>
                  <Route path="/users" element={<Users />}/>
                  <Route path="/useterms" element={<UseTerms/>}/>
                </Routes > 
              </div>
            </>
            :
            <Routes>
              <Route path="/" element={<Log signin={false} signup={true}/>}/>
              <Route path="/useterms" element={<UseTerms/>}/>
            </Routes>
            }
         </>
        )}
    </UidContext.Provider>
  )
}

export default App;