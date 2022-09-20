import React from "react";
import styled from 'styled-components'
import colors from "../../utils/styles/colors";


const CardContainer = styled.div`
    font-size: 1.2rem;
    border-radius: 20px;
    text-align: center;
    background-color: ${colors.secondary};
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid ${colors.tertiary};
`
const CardImg = styled.img`
    height: 200px;
`


const Card = ({ user }) => {

    return (
        <CardContainer key={user._id}>
            <p>UserCard</p>
            <p>{user.pseudo}</p>
            <CardImg  src={user.imageUrl} alt={user.imageUrl} />
        </CardContainer>
    )

}

export default Card;


