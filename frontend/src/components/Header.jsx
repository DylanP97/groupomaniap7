import React from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from "../assets/styles/colors";
import DarkLogo from '../assets/styles/Logos/icon-left-font-monochrome-black.png'
import HomeIcon from '../assets/styles/Icons/home.png';
import UserIcon from '../assets/styles/Icons/user.png';
import GroupIcon from '../assets/styles/Icons/group.png';
import NotifIcon from '../assets/styles/Icons/bell.png';
import Logout from "./Log/Logout";

const LogoStyle = styled.img`
    height: 100px;
`

const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`

const NavContainer = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.secondary}
`

const Header = () => {

    return (
        <NavContainer>
            <Link to="/">
                <LogoStyle src={DarkLogo} />
            </Link>
            <div>
                <Link to="/">
                    <Icons src={HomeIcon}/>
                </Link>
                <Link to="/profile">
                    <Icons src={UserIcon}/>
                </Link>
                <Link to="/users">
                    <Icons src={GroupIcon}/>
                </Link>
                <Link to="/notification">
                    <Icons src={NotifIcon}/>
                </Link>
                <Logout />
            </div>
        </NavContainer>
    )
}

export default Header;
