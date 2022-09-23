import React from "react";
import styled from 'styled-components'
import colors from "../../assets/styles/colors";
import { useDispatch, useSelector } from "react-redux";

import { dateParser, isEmpty } from "../../assets/utils/Utils";


const CardContainer = styled.div`
    font-size: 1.2rem;
    border-radius: 20px;
    text-align: center;
    background-color: ${colors.secondary};
    padding: 15px;
    margin: 10px 20px 10px 20px;
    border: 2px solid ${colors.tertiary};
`
const CardImg = styled.img`
    height: 200px;
`


const Card = ({ post }) => {


const usersData = useSelector((state) => state.usersReducer);
const userData = useSelector((state) => state.userReducer);
const dispatch = useDispatch();

    return (
        <CardContainer key={post._id}>
            <CardImg  src={post.imageUrl} alt={post.imageUrl} />
            <p>{post.message}</p>
            
            <span>
                {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                    if (user._id == post.posterId) return "écrit par " + user.pseudo + " ";
                    else return null;
                    })} le {dateParser(post.createdAt)}
            </span>
        </CardContainer>
    )

}

export default Card;


