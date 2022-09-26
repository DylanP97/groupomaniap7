import React  from "react";
import { useSelector } from "react-redux";
import UserCard from "./UsersTable/UserCard";
import { isEmpty } from "../assets/utils/Utils";


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
