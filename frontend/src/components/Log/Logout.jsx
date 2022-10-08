import React from "react";
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import axios from "axios";
import cookie from "js-cookie";

import { useSignOut } from 'react-auth-kit'

import LogoutIcon from '../../assets/styles/Icons/logout.png'


const Icons = styled.img`
height: 30px;
margin: 0px 20px 0px 20px;
`

const Logout = () => {

  const signOut = useSignOut()

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  };

  return (

    <Link>
      <Icons src={LogoutIcon} onClick={e => {signOut()}} alt="Icon-Logout"/>
    </Link>
  );
};

export default Logout;