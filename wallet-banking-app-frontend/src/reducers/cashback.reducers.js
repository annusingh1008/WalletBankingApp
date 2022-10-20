import { cashbackConstants } from "../actions/constants";

const initState = {
  totalPages: "",
  cashbackList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case cashbackConstants.CASHBACK_SUCCESS:
      state = {
        ...state,
        cashbackList: action.payload,
      };
      break;

    case cashbackConstants.TOTAL_CASHBACKS_SUCCESS:
      state = {
        ...state,
        totalPages: action.payload,
      };
      break;
  }

  return state;
};

export default reducer;

// export const getCashbacks = ({ cashbacks }) => cashbacks;
