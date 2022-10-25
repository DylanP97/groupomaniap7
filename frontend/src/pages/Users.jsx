import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import { isEmpty } from "../assets/utils/Utils";


const Users = () => {

    const users = useSelector((state) => state.usersReducer);

    return (

        <div>
            <h1>Voici tout les membres du réseau social de Groupomania</h1>
            <div className="UsersTable">
                {!isEmpty(users[0]) &&
                users.map((user) => {
                    return <UserCard user={user} key={user._id} />;
                })}
            </div>
        </div>
    )

}

export default Users;
