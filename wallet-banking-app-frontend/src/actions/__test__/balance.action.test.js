import thunk from "redux-thunk";
import axios from "axios";
import { getUserBalance } from "../balance.action";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("getBalanace", () => {
  describe("when API call is successful", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return balance", async () => {
      const store = mockStore({});
      jest
        .spyOn(axios, "get")
        .mockResolvedValue({ status: 200, data: "Mock Data" });

      await store.dispatch(getUserBalance("annu@gmail.com"));
      const actionsResulted = store.getActions();
      expect(actionsResulted[0].type).toEqual("GET_BALANCE_SUCCESS");
      expect(actionsResulted[0].payload).toEqual("Mock Data");
    });
  });
});
