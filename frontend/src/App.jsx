import React, { useEffect, useState } from "react";
import { AuthProvider , RequireAuth} from 'react-auth-kit'
import { Routes, Route, Navigate, Router } from 'react-router-dom'
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
import Home from "./pages/Home";
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


  return (
    <AuthProvider 
      authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={true}>
          <Routes>
          <Route path="/login" element={< Log signin={false} signup={true}/>} />

            <Route path="/" element={
              <RequireAuth loginPath={'/login'}>
                <Home />
              </RequireAuth>
            }/>
            <Route path="/profile/:id" element={
              <RequireAuth loginPath={'/login'}>
                <Profile/>
              </RequireAuth>
            }/>
            <Route path="/users" element={
              <RequireAuth loginPath={'/login'}>
                <Users />
              </RequireAuth>
            }/>
            {/* <Route path="/notification" element={<Notification />}/> */}
            {/* <Route path="/useterms" element={<UseTerms/>}/> */}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes > 
    </AuthProvider>
  )
}

export default App;