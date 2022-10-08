import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../assets/utils/Utils";
import { UidContext } from "./AppContext";


import styled from 'styled-components'
import { Link } from 'react-router-dom'
import DarkLogo from '../assets/styles/Logos/icon-left-font-monochrome-black.png'
import HomeIcon from '../assets/styles/Icons/home.png';
import GroupIcon from '../assets/styles/Icons/group.png';
import NotifIcon from '../assets/styles/Icons/bell.png';
import Logout from "./Log/Logout";



const Icons = styled.img`
    height: 30px;
    margin: 0px 20px 0px 20px;
`


const Header = () => {


const usersData = useSelector((state) => state.usersReducer);
const uid = useContext(UidContext);

    return (
        <nav className="NavContainer">
            <Link className="LogoLink" to="/">
                <img className="DarkLogo" src={DarkLogo} alt="LogoGroupomania"/>
            </Link>
            <div className="NavContainer__menu">
                <Link to="/profile">
                    <img className="ProfileImg"
                        src={
                        !isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                            if (user._id === uid) return user.imageUrl;
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
                <Link to="/notification">
                    <Icons src={NotifIcon} alt="Icon-Notification"/>
                </Link>
                <Logout />
            </div>
        </nav>
    )
}

export default Header;
