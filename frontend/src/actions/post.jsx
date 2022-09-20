import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          const array = res.data.slice(0, num);
          dispatch({ type: GET_POSTS, payload: array });
          dispatch({ type: GET_ALL_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };


export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};