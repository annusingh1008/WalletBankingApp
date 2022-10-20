import { transactionsConstants } from '../../actions/constants';
import transactionReducer from '../transactions.reducers';

describe('reducer', () => {
  describe('with TRANSACTIONS_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
        totalPages: '',
        transactions: []
      }

      const payload = {
        transactions: [{  }]
      };

      const nextState = transactionReducer(prevState, {
        type: transactionsConstants.TRANSACTIONS_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});
    });
  });

  describe('with TOTAL_TRANSACTIONS_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
        totalPages: '',
        transactions: []
      }

      const payload = {
        totalPages: '24'
      };

      const nextState = transactionReducer(prevState, {
        type: transactionsConstants.TOTAL_TRANSACTIONS_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});
    });
  });

})