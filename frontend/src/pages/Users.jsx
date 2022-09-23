import React from "react";
import Header from "../components/Header";
import UsersTable from "../components/UsersTable";


const Users = () => {

    return (
        <div>
            <h1>Voici les membres du groupe</h1>
            <UsersTable/>
        </div>
    )

}

export default Users;
