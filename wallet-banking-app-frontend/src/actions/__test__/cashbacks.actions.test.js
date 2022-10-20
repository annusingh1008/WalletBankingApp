import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import {
  getAllCashBacks,
  getCashbacks,
  getTotalCashbacks,
} from "../cashback.actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Cashback actions", () => {
  describe("getCashbacks", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should return cashbacks", async () => {
        const store = mockStore({});
        jest
          .spyOn(axios, "get")
          .mockResolvedValue({ status: 200, data: "Mock Data" });

        await store.dispatch(getAllCashBacks(0, "annu@gmail.com"));
        const actionsResulted = store.getActions();
        expect(actionsResulted[0].type).toEqual("CASHBACK_SUCCESS");
        expect(actionsResulted[0].payload).toEqual("Mock Data");
      });
    });
  });

  describe("getTotalCashbacks", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should return total number of cashbacks", async () => {
        const store = mockStore({});
        jest
          .spyOn(axios, "get")
          .mockResolvedValue({ status: 200, data: "Mock Data" });

        await store.dispatch(getTotalCashbacks("annu@gmail.com"));
        const actionsResulted = store.getActions();
        expect(actionsResulted[0].type).toEqual("TOTAL_CASHBACKS_SUCCESS");
        expect(actionsResulted[0].payload).toEqual("Mock Data");
      });
    });
  });
  describe("#getCashbacks", () => {
    it("returns cashbacks list and total pages", () => {
      const state = {
        cashbacks: { cashbackList: [], totalPages: 1 },
      };

      const result = getCashbacks(state);
      expect(result).toStrictEqual(state.cashbacks);
    });
  });
});
