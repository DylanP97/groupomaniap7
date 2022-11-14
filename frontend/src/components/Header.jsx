import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { isEmpty } from "../assets/utils/Utils";
import { UidContext } from "./AppContext";
import DarkLogo from '../assets/styles/Logos/icon-left-font-monochrome-black.png'
import HomeIcon from '../assets/styles/Icons/home.png';
import GroupIcon from '../assets/styles/Icons/group.png';
import Logout from "./Log/Logout";

const Icons = styled.img`
    height: 30px;
    margin: 0px 20px 0px 20px;
`

const Header = () => {

const usersData = useSelector((state) => state.usersReducer);
const uid = useContext(UidContext);

    return (
        <nav className="navContainer">
            <Link className="logoLink" to="/">
                <img className="darkLogo" src={DarkLogo} alt="LogoGroupomania"/>
            </Link>
            <div className="navContainer__menu">
                <Link to="/profile">
                    <img className="profileImg"
                        src={
                        !isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                            if (user._id === uid) return process.env.REACT_APP_API_URL + user.imageUrl;
                            else return null;
                            })
                            .join("")
                        }
                        alt="user-pic"
                    />
                </Link>
                <Link to="/">
                    <Icons src={HomeIcon} alt="Icon-Home"/>
                </Link>

                <Link to="/users">
                    <Icons src={GroupIcon} alt="Icon-Group"/>
                </Link>
                <Logout />
            </div>
        </nav>
    )
}

export default Header;