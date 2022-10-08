import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Header from "../components/Header";
import Log from "../components/Log";
import UsersTable from "../components/UsersTable";


const Users = () => {

    const uid = useContext(UidContext);


    return (

                <div>
                    <Header/>
                    <h1>Voici tout les membres du réseau social de Groupomania</h1>
                    <UsersTable/>
                </div>

    )

}

export default Users;
