import React  from "react";
import { useSelector } from "react-redux";
import { useAuthHeader} from 'react-auth-kit'
import axios from "axios";

import { getPosts } from "../actions/post";
import Card from "./Thread/Card";
import { isEmpty } from "../assets/utils/Utils";


const Thread = () => {

  const posts = useSelector((state) => state.postReducer);
  const authHeader = useAuthHeader()
  const config = {
    headers: { 
      authorization: authHeader() ,
      "content-type" : "multipart/form-data",
      Accept: FormData
    }
  }

  const fetchPosts = () => {
    axios.get(getPosts,config)
    .then((res)=>{})
    .catch((err) => { console.log(err)})
  }

  return (
      <div className="thread">
        <h1 aria-label="hey-emoji">Le fil d'actualité Groupomania 🙋</h1>
        <div>
          {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return (
              <Card config={config} fetch= {() => fetchPosts()} post={post} key={post._id} />
            )
          })}
        </div>
      </div>

      );
}

export default Thread;