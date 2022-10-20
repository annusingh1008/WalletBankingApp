import thunk from "redux-thunk";
import axios from "axios";
import { recharge } from "../recharge.actions";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("recharge", () => {
  describe("when API call is successful", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should recharge wallet", async () => {
      const store = mockStore({});
      jest.spyOn(axios, "post").mockResolvedValue({
        status: 200,
        data: "Amount Credited Successfully...!!",
      });

      jest.spyOn(window, "alert").mockImplementation(() => {});

      await store.dispatch(
        recharge({
          email: "annu@gmail.com",
          amount: 100,
          currentAmount: 1000,
        })
      );
      const actionsResulted = store.getActions();
      console.log("actionsResulted", actionsResulted);
      expect(actionsResulted[0].type).toEqual("RECHARGE_SUCCESS");
      expect(actionsResulted[0].payload).toEqual({
        amount: 1100,
        email: "annu@gmail.com",
      });
    });
  });
});
