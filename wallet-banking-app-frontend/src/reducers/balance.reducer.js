import { getBalanceConstants } from "../actions/constants";

const initState = {
  amount: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case getBalanceConstants.GET_BALANCE_SUCCESS:
      state = {
        amount: action.payload,
      };
      break;
  }
  return state;
};

export default reducer;

export const getBalance = ({ balance }) => balance;
