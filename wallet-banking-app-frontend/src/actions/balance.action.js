import axios from "axios";
import { getBalanceConstants } from "./constants";

export const getUserBalance = (email) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:8085/getBalance/${email}`);

    dispatch({
      type: getBalanceConstants.GET_BALANCE_SUCCESS,
      payload: res.data,
    });
  };
};
