import axios from "axios";
import { cashbackConstants } from "./constants";

export const getAllCashBacks = (currentPage, email) => {
  return async (dispatch) => {
    const userEmail = localStorage.getItem("email");
    const res = await axios.get(
      `http://localhost:8085/getAllCashbacks/${userEmail}?pageNumber=${currentPage}&pageSize=${10}`
    );

    dispatch({
      type: cashbackConstants.CASHBACK_SUCCESS,
      payload: res.data,
    });
  };
};

export const getCashbacks = (state) => state.cashbacks;

export const getTotalCashbacks = (email) => {
  return async (dispatch) => {
    const res = await axios.get(
      `http://localhost:8085/getTotalCashbacks/${email}`
    );

    dispatch({
      type: cashbackConstants.TOTAL_CASHBACKS_SUCCESS,
      payload: res.data,
    });
  };
};
