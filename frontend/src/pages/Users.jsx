import React from "react";

import Header from "../components/Header";
import UsersTable from "../components/UsersTable";


const Users = () => {

    return (

        <div>
            <Header/>
            <h1>Voici tout les membres du réseau social de Groupomania</h1>
            <UsersTable/>
        </div>
    )

}

export default Users;
