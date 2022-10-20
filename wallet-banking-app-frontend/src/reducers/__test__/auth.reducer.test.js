import { amountTransferConstants, authConstants, getUserDetailsConstants, rechargeConstants } from '../../actions/constants';
import authReducer from '../auth.reducers'

describe('reducer', () => {
  describe('with LOGIN_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const payload = {
        user: { email: 'annu', password: '1234' },
      };

      const nextState = authReducer(prevState, {
        type: authConstants.LOGIN_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({
        authenticate: true
      }),
        {});
    });
  });

  describe('with GET_USER_DETAILS_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const payload = {
        user: { firstName: 'annu', lastName: 'singh', email: 'annu', password: '1234', amount: '10' },
      };

      const nextState = authReducer(prevState, {
        type: getUserDetailsConstants.GET_USER_DETAILS_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});

    });
  });


  describe('with RECHARGE_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const payload = {
        user: { email: 'annu', amount: '10' },
      };

      const nextState = authReducer(prevState, {
        type: rechargeConstants.RECHARGE_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});

        
    });
  });

  describe('with AMOUNT_TRANSFER_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const payload = {
        user: { email: 'annu', amount: '10' },
      };

      const nextState = authReducer(prevState, {
        type: amountTransferConstants.AMOUNT_TRANSFER_SUCCESS,
        payload
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});

        
    });
  });

  describe('with LOGOUT_REQUEST action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const nextState = authReducer(prevState, {
        type: authConstants.LOGOUT_REQUEST
      });

      expect(nextState).toStrictEqual(expect.objectContaining({ loading: true}), {});
        
    });
  });

  describe('with LOGOUT_SUCCESS action', () => {
    it('returns deduced state', () => {
      const prevState = {
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
      };

      const nextState = authReducer(prevState, {
        type: authConstants.LOGOUT_SUCCESS
      });

      expect(nextState).toStrictEqual(expect.objectContaining({ }), {});
        
    });
  });


})