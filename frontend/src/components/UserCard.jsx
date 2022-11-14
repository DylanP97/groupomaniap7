import React from "react";


const UserCard = ({ user }) => {

    return (
        <div className="userCardContainer" key={user._id}>
            <div className="userCardContainer__upperDiv">
                <img className="profileImg" src={process.env.REACT_APP_API_URL + user.imageUrl} alt={user.imageUrl} />
               <h3>{user.pseudo}</h3>
            </div>
            {user.job && (
                <span>{user.job}</span>
            )}
        </div>
    )

}

export default UserCard;