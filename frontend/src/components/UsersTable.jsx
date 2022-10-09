import React  from "react";
import { useSelector } from "react-redux";

import { isEmpty } from "../assets/utils/Utils";
import UserCard from "./UsersTable/UserCard";


const UsersTable = () => {
    const users = useSelector((state) => state.usersReducer);

    return (
        <div className="UsersTable">
            {!isEmpty(users[0]) &&
            users.map((user) => {
                return (
                    <UserCard user={user} key={user._id} />
                )
            })}
        </div>
    );
}

export default UsersTable;
