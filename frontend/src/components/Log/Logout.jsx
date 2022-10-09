import React from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'

import LogoutIcon from '../../assets/styles/Icons/logout.png'


const Icons = styled.img`
height: 30px;
margin: 0px 20px 0px 20px;
`

const Logout = () => {

  const signOut = useSignOut()

  return (

    <Link>
      <Icons src={LogoutIcon} onClick={e => {signOut()}} alt="Icon-Logout"/>
    </Link>
  );
};

export default Logout;