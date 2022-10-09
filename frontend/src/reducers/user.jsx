import {
    GET_USER,
    UPDATE_USER,
  } from "../actions/user";
  
  const initialState = {};
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case UPDATE_USER:
        return action.payload;
        
      default:
        return state;
    }
  }