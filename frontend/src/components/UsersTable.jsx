import React  from "react";
import { useSelector } from "react-redux";
import UserCard from "./UsersTable/UserCard";
import { isEmpty } from "../assets/utils/Utils";


const UsersTable = () => {
    const users = useSelector((state) => state.usersReducer);


    return (
        <div>
            <h2>UsersTable</h2>
            <div>
                {!isEmpty(users[0]) &&
                users.map((user) => {
                    return (
                        <div>
                            <UserCard user={user} key={user._id} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default UsersTable;
