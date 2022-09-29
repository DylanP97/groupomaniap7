import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import { isEmpty } from "../assets/utils/Utils";
import ProfileCard from "../components/ProfileCard"


const Profile = () => {

    const users = useSelector((state) => state.usersReducer);
    const uid = useContext(UidContext);

    return (
        <div>
            <h1>Voici votre Profil </h1>
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
