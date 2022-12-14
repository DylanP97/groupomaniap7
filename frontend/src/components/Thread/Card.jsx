import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'

import { dateParser, isEmpty } from "../../assets/utils/Utils";
import { modifyPost } from "../../actions/post";
import CardDelete from "./CardDelete";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import CommentIcon from "../../assets/styles/Icons/comment.png"
import ShareIcon from "../../assets/styles/Icons/share.png"
import { Loader } from "../../assets/styles/Loader";


const CardImg = styled.img`
    max-height: 80vh;
    max-width: 100%;
`
const Icons = styled.img`
    height: 20px;
    margin: 0px 20px 0px 20px;
`

const Card = ({ post }) => {

const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);


    return (
        <div key={post._id}>
            {isLoading ? (
                <Loader/>
            ) : (
            <div className="cardContainer" key={post._id}>
                <div className="cardHeader">
                    <div className="cardHeader__left">
                        <img className="profileImg"
                            src={
                            !isEmpty(usersData[0]) &&
                            usersData
                                .map((user) => {
                                if (user._id === post.posterId) return process.env.REACT_APP_API_URL + user.imageUrl;
                                else return null;
                                })
                                .join("")
                            }
                            alt="poster-pic" />
                        <p>
                            {!isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === post.posterId) return user.pseudo + " ";
                                    else return null;
                                })}
                        </p>
                    </div>
                    <div className="cardHeader__right">
                        <span>{dateParser(post.createdAt)}</span>
                        {userData._id === post.posterId || userData.isAdmin === true ? (
                        <div className="dropdown">
                            <i className="fa-solid fa-lg fa-ellipsis-vertical"></i>
                            <div className="dropdownContent">
                                <div className="dropdownList" onClick={() => setIsUpdated(!isUpdated)}>
                                    <p onClick={updateItem}>Edit post</p>
                                </div>
                                <CardDelete id={post._id} />
                            </div>
                        </div>
                        ) : null}
                    </div>
                </div>
                <div className="cardMain" style={{textAlign: post.message.length > 100 ? 'left' : 'center'}}>
                    {post.imageUrl && (
                    <CardImg src={process.env.REACT_APP_API_URL + post.imageUrl} alt={post.imageUrl} />
                    )}
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <>
                            <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                            <div>
                                <button className="btn" onClick={updateItem} >
                                    Send
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="cardFooter">
                    <LikeButton post={post} />
                    <div className="commentSection">
                        <div className="commentSection__trigger">
                            <Icons onClick={() => setShowComments(!showComments)} src={CommentIcon} alt="CommentIcon"/>
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                    <Icons src={ShareIcon} alt="ShareIcon"/>
                </div>
                <div className="cardComments">
                    {showComments && <CardComments post={post} />}
                </div>
            </div>
            )}
        </div>
    )
}

export default Card;
