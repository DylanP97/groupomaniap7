import React from "react";
import styled from 'styled-components'
import colors from "../../assets/styles/colors";



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


const Card = ({ post }) => {

    return (
        <CardContainer key={post._id}>
            {/* <p>{post.pseudo}</p> */}
            <p>{post.message}</p>
            <CardImg  src={post.imageUrl} alt={post.imageUrl} />
        </CardContainer>
    )

}

export default Card;


