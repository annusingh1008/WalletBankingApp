import { userConstants } from "./constants";
import axios from "axios";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axios.post("http://localhost:8085/signup", {
      ...user,
    });

    if (res.status === 200) {
      if (res.data === "Account created successfully...!!") {
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: res.data,
        });
        alert("Account Created Successfully!!");
      } else {
        alert("Email already exists...!! \nPlease try with another Email");
      }
    }
  };
};

export const getUser = (state) => state.user;
