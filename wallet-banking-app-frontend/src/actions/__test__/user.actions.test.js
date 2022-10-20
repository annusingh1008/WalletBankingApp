import thunk from "redux-thunk";
import axios from "axios";
import { getUser, signup } from "../user.actions";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("user actions", () => {
  describe("Signup", () => {
    describe("when API call is successful", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should login request", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Account created successfully...!!",
        });

        await store.dispatch(
          signup({
            firstName: "annu",
            lastName: "singh",
            email: "annu@gmail.com",
            password: "1234",
            confirmPassword: "1234",
            mobileNumber: "12345678",
          })
        );
        const actionsResulted = store.getActions();
      });
    });
  });

  describe("Signup", () => {
    describe("when email alread exists", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should login request", async () => {
        const store = mockStore({});
        jest.spyOn(axios, "post").mockResolvedValue({
          status: 200,
          data: "Email already exists...!! \nPlease try with another Email",
        });

        await store.dispatch(
          signup({
            firstName: "annu",
            lastName: "singh",
            email: "annu@gmail.com",
            password: "1234",
            confirmPassword: "1234",
            mobileNumber: "12345678",
          })
        );
        // const actionsResulted = store.getActions();
      });
    });
  });

  describe("#getUser", () => {
    it("returns user", () => {
      const state = {
        user: { error: null, message: "", loading: false },
      };

      const result = getUser(state);
      expect(result).toStrictEqual(state.user);
    });
  });
});
