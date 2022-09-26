import React from "react";
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import axios from "axios";
import cookie from "js-cookie";

import LogoutIcon from '../../assets/styles/Icons/logout.png'


const Logout = () => {

  const Icons = styled.img`
    height: 30px;
    margin: 0px 20px 0px 20px;
  `

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
        <Icons src={LogoutIcon} onClick={logout}/>
    </Link>
  );
};

export default Logout;