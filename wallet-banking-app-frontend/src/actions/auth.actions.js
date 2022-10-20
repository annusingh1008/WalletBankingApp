import axios from "axios";
import { authConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8085/signin", {
      ...user,
    });

    if (res.status === 200) {
      if (res.data === "Signed in Successfully...!!") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email", user.email);

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: user,
        });
      } else if (res.data === "Account does not exists with this email...!!") {
        alert("Account does not exists!! \nPlease check your email..");
      } else if (res.data === "Incorrect Password...!!") {
        alert("Please check your Password!!");
      }
    }
  };
};

export const getAuthDetails = (state) => state.auth;

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  };
};
