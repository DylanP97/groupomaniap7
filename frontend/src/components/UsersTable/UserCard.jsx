import React from "react";
import styled from 'styled-components'


const ProfileImg = styled.img`
    height: 50px;
    clip-path: circle();
    margin-right: 10px;
`


const Card = ({ user }) => {

    return (
        <div className="UserCardContainer" key={user._id}>
            <div  className="UserCardContainer__UpperDiv">
                <ProfileImg  src={user.imageUrl} alt={user.imageUrl} />
                <h3>{user.pseudo}</h3>
            </div>
            {user.job && (
                <span>Métier : {user.job}</span>
            )}
            {user.bio && (
                <span>Bio : {user.bio}</span>
            )}

        </div>
    )

}

export default Card;


