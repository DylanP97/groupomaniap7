import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { isEmpty } from "../assets/utils/Utils";
import { UidContext } from "../components/AppContext";
import ProfileCard from "../components/ProfileCard"
import Header from "../components/Header";


const Profile = () => {

    const users = useSelector((state) => state.usersReducer);
    const uid = useContext(UidContext);

    return (
        <div>
            <Header/>
            <h1>Mon Profil 👤</h1>
            <div className="UsersTable">
                {!isEmpty(users[0]) &&
                users.map((user) => {
                    if (user._id === uid) return <ProfileCard user={user} key={user._id} />;
                        else return null;
                })}
            </div>
        </div>
    )
}

export default Profile;
