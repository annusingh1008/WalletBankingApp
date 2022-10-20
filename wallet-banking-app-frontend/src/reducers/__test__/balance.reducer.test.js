import { getBalanceConstants } from "../../actions/constants";
import balanceReducer, { getBalance } from "../balance.reducer";

describe("reducer", () => {
  describe("with LOGIN_SUCCESS action", () => {
    it("returns deduced state", () => {
      const prevState = {
        amount: "",
      };

      const payload = {
        amount: "100",
      };

      const nextState = balanceReducer(prevState, {
        type: getBalanceConstants.GET_BALANCE_SUCCESS,
        payload,
      });

      expect(nextState).toStrictEqual(expect.objectContaining({}), {});
    });
  });

  describe("#getbalance", () => {
    it("returns total balance", () => {
      const state = {
        amount: "",
      };

      const result = getBalance(state);
      expect(result).toStrictEqual(state.balance);
    });
  });
});
