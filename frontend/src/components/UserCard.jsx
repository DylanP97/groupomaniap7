import React from "react";


const UserCard = ({ user }) => {

    return (
        <div className="UserCardContainer" key={user._id}>
            <div className="UserCardContainer__UpperDiv">
                <img className="ProfileImg" src={user.imageUrl} alt={user.imageUrl} />
               <h3>{user.pseudo}</h3>
            </div>
            {user.job && (
                <span>{user.job}</span>
            )}
        </div>
    )

}

export default UserCard;