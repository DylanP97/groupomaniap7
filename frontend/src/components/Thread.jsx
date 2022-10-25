import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/post";
import Card from "./Thread/Card";
import { isEmpty } from "../assets/utils/Utils";


const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
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
    <div className="thread">
        <h1 aria-label="hey-emoji">Le fil d'actualité 🙋</h1>
        <div>
            {!isEmpty(posts[0]) &&
            posts.map((post) => {
                return (
                  <Card post={post} key={post._id} />
                )
            })}
        </div>
    </div>
  );
}

export default Thread;