import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;

    // case userConstants.USER_REGISTER_FAILURE:
    //     state = {
    //         ...state,
    //         loading: false,
    //         error: action.payload
    //     }
    //     break;
  }
  return state;
};

export default reducer;
