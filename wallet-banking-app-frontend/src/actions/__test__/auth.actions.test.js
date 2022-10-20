import thunk from "redux-thunk";
import axios from "axios";
import { getAuthDetails, login, signout } from "../auth.actions";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("auth actions", () => {
  describe("Login", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should login", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Signed in Successfully...!!",
        });

        await store.dispatch(
          login({
            email: "annu@gmail.com",
            password: "1234",
          })
        );
        const actionsResulted = store.getActions();
        console.log("actionsResulted", actionsResulted);
        expect(actionsResulted[0].type).toEqual("LOGIN_SUCCESS");
        expect(actionsResulted[0].payload).toEqual({
          email: "annu@gmail.com",
          password: "1234",
        });
      });
    });
  });

  describe("Login", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("Account does not exist", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Account does not exists with this email...!!",
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await store.dispatch(
          login({
            email: "annu@gmail.com",
            password: "1234",
          })
        );
      });
    });
  });

  describe("Login", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("Incorrect password", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Incorrect Password...!!",
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await store.dispatch(
          login({
            email: "annu@gmail.com",
            password: "1234",
          })
        );
      });
    });
  });

  describe("Signout", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("signout", async () => {
        const store = mockStore({});
        await store.dispatch(signout());
      });
    });
  });

  describe("#getAuthDetails", () => {
    it("returns auth Details", () => {
      const state = {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          amount: "",
        },
        authenticate: true,
        loading: false,
        error: null,
      };

      const result = getAuthDetails(state);
      expect(result).toStrictEqual(state.auth);
    });
  });
});
