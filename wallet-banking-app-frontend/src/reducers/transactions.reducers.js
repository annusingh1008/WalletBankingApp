import { transactionsConstants } from "../actions/constants";

const initState = {
    totalPages: '',
    transactions: []
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case transactionsConstants.TRANSACTIONS_SUCCESS:
            state = {
                ...state,
                transactions: action.payload
            }
            break;
        case transactionsConstants.TOTAL_TRANSACTIONS_SUCCESS:
            state = {
                ...state,
                totalPages: action.payload
            }
            break;
    }

    return state;

}

export default reducer