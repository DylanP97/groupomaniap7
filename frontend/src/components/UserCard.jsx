import React from "react";


const UserCard = ({ user }) => {

    return (
        <div className="UserCardContainer" key={user._id}>
            <div className="UserCardContainer__UpperDiv">
                <img className="ProfileImg" src={user.imageUrl} alt={user.imageUrl} />
               <h3>{user.pseudo}</h3>
            </div>
            {user.job && (
                <span>Métier : {user.job}</span>
            )}
            {/* {user.bio && (
                <span className="bioUserCard">Bio : {user.bio}</span>
            )} */}
        </div>
    )

}

export default UserCard;