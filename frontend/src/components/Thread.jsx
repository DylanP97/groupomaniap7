import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post";
import Card from "./Thread/Card";
import { isEmpty } from "../assets/utils/Utils";


const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(20);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
  
    const loadMore = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
        setLoadPost(true);
      }
    }
  
    useEffect(() => {
      if (loadPost) {
        dispatch(getPosts(count));
        setLoadPost(false);
        setCount(count + 7);
      }
  
      window.addEventListener('scroll', loadMore);
      return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);



    return (
        <div>
            <h2>Bienvenue sur le thread de Groupomania</h2>
            <div>
                <ul>
                {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return (
                    <div>
                        <Card post={post} key={post._id} />
                    </div>
                    )
                })}
                </ul>
            </div>
        </div>

        );
}

export default Thread;
