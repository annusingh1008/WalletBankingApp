import axios from "axios";
import { transactionsConstants } from "./constants";

export const getAllTransactions = (currentPage, email) => {
  return async (dispatch) => {
    const res = await axios.get(
      `http://localhost:8085/getAllTransactions/${email}?pageNumber=${currentPage}&pageSize=${10}`
    );

    dispatch({
      type: transactionsConstants.TRANSACTIONS_SUCCESS,
      payload: res.data,
    });
  };
};

export const getTransactions = (state) => state.transactions;

export const getTotalTransactions = (email) => {
  return async (dispatch) => {
    const res = await axios.get(
      `http://localhost:8085/getTotalTransactions/${email}`
    );

    dispatch({
      type: transactionsConstants.TOTAL_TRANSACTIONS_SUCCESS,
      payload: res.data,
    });
  };
};
