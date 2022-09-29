import {
    GET_USER,
    UPDATE_USER,
    // UPDATE_BIO,
    // UPLOAD_PICTURE,
  } from "../actions/user";
  
  const initialState = {};
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case UPDATE_USER:
        return action.payload;

        // return state.map((user) => {
          // if (user._id === action.payload.id) {
        //   } else return user;
        // });
    //   case UPDATE_BIO:
    //     return {
    //       ...state,
    //       bio: action.payload,
    //     };
      default:
        return state;
    }
  }