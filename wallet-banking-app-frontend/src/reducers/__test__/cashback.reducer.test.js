import { cashbackConstants, getBalanceConstants } from '../../actions/constants';
import cashbackReducer from '../cashback.reducers';

describe('reducer', () => {
    describe('with CASHBACK_SUCCESS action', () => {
      it('returns deduced state', () => {
        const prevState = {
            totalPages: '',
            cashbackList: []
        }
  
        const payload = {
            cashbacks: [{ email: "annu@gmail.com", prev_amount: 1000, cashback_amount: 100, current_amount: 1100, date: "2022-10-04T05:50:10.308+00:00" }]
        };
  
        const nextState = cashbackReducer(prevState, {
          type: cashbackConstants.CASHBACK_SUCCESS,
          payload
        });
  
        expect(nextState).toStrictEqual(expect.objectContaining({ }), {});
      });
    });

    describe('with TOTAL_CASHBACKS_SUCCESS action', () => {
        it('returns deduced state', () => {
          const prevState = {
              totalPages: '',
              cashbackList: []
          }
    
          const payload = {
               totalPages: '24'
          };
    
          const nextState = cashbackReducer(prevState, {
            type: cashbackConstants.TOTAL_CASHBACKS_SUCCESS,
            payload
          });
    
          expect(nextState).toStrictEqual(expect.objectContaining({ }), {});
        });
      });
 
})