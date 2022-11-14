import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { isEmpty } from "../assets/utils/Utils";


const Users = () => {

    const users = useSelector((state) => state.usersReducer);

    return (

        <div>
            <h1>Discover all our members!</h1>
            <div className="usersTable">
                {!isEmpty(users[0]) &&
                users.map((user) => {
                    return <UserCard user={user} key={user._id} />;
                })}
            </div>
        </div>
    )

}

export default Users;
