import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../../assets/utils/Utils";

import { modifyPost } from "../../actions/post";

import styled from 'styled-components'
import colors from "../../assets/styles/colors";
import CardDelete from "./CardDelete";
import EditIcon from "../../assets/styles/Icons/edit.png"
import MenuIcon from "../../assets/styles/Icons/menu.png"
import LikeButton from "./LikeButton";



const CardImg = styled.img`
    height: 200px;
`
const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`


const Card = ({ post }) => {

// const [isLoading, setIsLoading] = useState(true);
const [isUpdated, setIsUpdated] = useState(false);
const [textUpdate, setTextUpdate] = useState(null);
const [showComments, setShowComments] = useState(false);
const usersData = useSelector((state) => state.usersReducer);
const userData = useSelector((state) => state.userReducer);
const dispatch = useDispatch();

const updateItem = () => {
    if (textUpdate) {
      dispatch(modifyPost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

//   useEffect(() => {
//     !isEmpty(usersData[0]) && setIsLoading(false);
//   }, [usersData]);


    return (
        <div className="CardContainer" key={post._id}>
            <div className="CardMain">
                <div className="CardMainLeft">

                    {post.imageUrl && (
                    <CardImg src={post.imageUrl} alt={post.imageUrl} />
                    )}

                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div>
                            <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                            <div>
                                <button className="btn" onClick={updateItem} >
                                    Valider modification
                                </button>
                            </div>
                        </div>
                    )}

                    <span>
                        {!isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                            if (user._id === post.posterId) return "écrit par " + user.pseudo + " ";
                            else return null;
                            })} le {dateParser(post.createdAt)}
                    </span>

                </div>
                <div className="CardMainRight">
                    {userData._id === post.posterId && (
                        <>
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                            <Icons src={EditIcon} alt="EditIcon" onClick={updateItem}/>
                            </div>
                            <CardDelete id={post._id} />
                        </>
                    )}
                </div>
            </div>
            <div className="CardFooter">
                <LikeButton post={post} />
            </div>
        </div>
    )

}

export default Card;

