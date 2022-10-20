import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import {
  getAllTransactions,
  getTotalTransactions,
  getTransactions,
} from "../transactions.actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("getTransactions", () => {
  describe("when API call is successful", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return transactions", async () => {
      const store = mockStore({});
      jest
        .spyOn(axios, "get")
        .mockResolvedValue({ status: 200, data: "Mock Data" });

      await store.dispatch(getAllTransactions(0, "annu@gmail.com"));
      const actionsResulted = store.getActions();
      expect(actionsResulted[0].type).toEqual("TRANSACTIONS_SUCCESS");
      expect(actionsResulted[0].payload).toEqual("Mock Data");
    });
  });
});

describe("getTotalTransactions", () => {
  describe("when API call is successful", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return total number of transactions", async () => {
      const store = mockStore({});
      jest
        .spyOn(axios, "get")
        .mockResolvedValue({ status: 200, data: "Mock Data" });

      await store.dispatch(getTotalTransactions("annu@gmail.com"));
      const actionsResulted = store.getActions();
      expect(actionsResulted[0].type).toEqual("TOTAL_TRANSACTIONS_SUCCESS");
      expect(actionsResulted[0].payload).toEqual("Mock Data");
    });
  });
});

describe("#getTransactions", () => {
  it("returns transactions list and total pages", () => {
    const state = {
      transactions: { transactions: [], totalPages: 1 },
    };

    const result = getTransactions(state);
    expect(result).toStrictEqual(state.transactions);
  });
});
