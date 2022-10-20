import { amountTransferConstants, authConstants, getUserDetailsConstants, rechargeConstants } from "../actions/constants"

const initState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        amount: '',
    },
    authenticate: false,
    loading: false,
    error: null,
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        // case authConstants.LOGIN_REQUEST:
        //     state = {
        //         ...state,
        //     }
        //     break;

        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                authenticate: true
            }
            break;

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;

        // case getUserDetailsConstants.GET_USER_DETAILS_REQUEST:
        //     state = {
        //         ...state
        //     }
        //     break;

        case getUserDetailsConstants.GET_USER_DETAILS_SUCCESS:
            state = {
                ...state,
                user: action.payload
            }
            break;

        // case getUserDetailsConstants.GET_USER_DETAILS_FAILURE:
        //     state = {
        //         ...state
        //     }
        //     break;

        case rechargeConstants.RECHARGE_SUCCESS:
            state = {
                ...state,
                user: action.payload,
            }
            break;

        // case rechargeConstants.RECHARGE_FAILURE:
        //     state = {
        //         ...state,
        //     }
        //     break;

        case amountTransferConstants.AMOUNT_TRANSFER_SUCCESS:
            state = {
                ...state,
                user: action.payload
            }
            break;

        // case amountTransferConstants.AMOUNT_TRANSFER_FAILURE:
        //     state = {
        //         ...state
        //     }
        //     break;
    }

    return state;
}

export default reducer;