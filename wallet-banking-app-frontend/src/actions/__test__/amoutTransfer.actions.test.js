import thunk from "redux-thunk";
import axios from "axios";
import { amountTransfer } from "../amountTransfer.action";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Amount transfer actions", () => {
  describe("Amount Transfer", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should transfer amount", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Amount Transferred Successfully...!!",
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await store.dispatch(
          amountTransfer({
            email: "annu@gmail.com",
            amount: 100,
            creditToEmail: "abhi@gmail.com",
            currentAmount: 1000,
          })
        );
        const actionsResulted = store.getActions();
        console.log("actionsResulted", actionsResulted);
        expect(actionsResulted[0].type).toEqual("AMOUNT_TRANSFER_SUCCESS");
        expect(actionsResulted[0].payload).toEqual({
          amount: 900,
          email: "annu@gmail.com",
        });
      });
    });
  });

  describe("Amount Transfer", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("User does not exist", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "User does not exist",
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await store.dispatch(
          amountTransfer({
            email: "annu@gmail.com",
            amount: 100,
            creditToEmail: "abhi@gmail.com",
            currentAmount: 1000,
          })
        );
      });
    });
  });
});
