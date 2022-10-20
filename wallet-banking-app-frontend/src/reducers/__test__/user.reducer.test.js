import { userConstants } from "../../actions/constants";
import userReducer from "../user.reducers";

describe("reducer", () => {
  describe("with USER_REGISTER_REQUEST action", () => {
    it("returns deduced state", () => {
      const prevState = {
        error: null,
        message: "",
        loading: false,
      };

      const nextState = userReducer(prevState, {
        type: userConstants.USER_REGISTER_REQUEST,
      });

      expect(nextState).toStrictEqual(
        expect.objectContaining({ loading: true }),
        {}
      );
    });
  });

  describe("with USER_REGISTER_SUCCESS action", () => {
    it("returns deduced state", () => {
      const prevState = {
        error: null,
        message: "",
        loading: false,
      };

      const payload = {
        message: "",
      };

      const nextState = userReducer(prevState, {
        type: userConstants.USER_REGISTER_SUCCESS,
        payload,
      });

      expect(nextState).toStrictEqual(
        expect.objectContaining({
          loading: false,
          message: payload,
        }),
        {}
      );
    });
  });
});
