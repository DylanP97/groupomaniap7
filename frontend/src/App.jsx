import React from "react";
import { AuthProvider , RequireAuth} from 'react-auth-kit'
import { Routes, Route, Navigate } from 'react-router-dom'

import './assets/styles/index.css';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Home from "./pages/Home";
import Log from "./pages/Log";


const App = () => {

  return (
    <AuthProvider 
      authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={true}>
          <Routes>
          <Route path="/login" element={<Log signin={false} signup={true}/>} />

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
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes > 
    </AuthProvider>
  )
}

export default App;