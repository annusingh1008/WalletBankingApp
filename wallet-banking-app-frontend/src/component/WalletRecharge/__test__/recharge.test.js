import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import WalletRecharge from "../index";
import { Provider } from "react-redux";
import store from "../../../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import { recharge } from "../../../actions/recharge.actions";
import { Form } from "react-bootstrap";
import { getBalance } from "../../../reducers/balance.reducer";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../../actions/recharge.actions", () => ({
  recharge: jest.fn(() => ({ type: "recharge" })),
}));

jest.mock("../../../reducers/balance.reducer", () => ({
  getBalance: jest.fn(() => ({ amount: 1000 })),
}));

jest.mock("../../Layout", () =>
  jest.fn(({ children }) => <div data-testid="layout">{children}</div>)
);

jest.mock("react-bootstrap", () => ({
  Row: jest.fn(({ children }) => <div data-testid="row">{children}</div>),
  Col: jest.fn(({ children }) => <div data-testid="col">{children}</div>),
  Container: jest.fn(({ children }) => (
    <div data-tesid="container">{children}</div>
  )),
  Button: jest.fn(({ children }) => (
    <div data-testid="transferAmountButton">{children}</div>
  )),
  Form: jest.fn(({ children }) => <div data-testid="form">{children}</div>),
}));

const localStorageData = {
  email: "annu",
  password: "1234",
};

const localStorageMock = (function () {
  return {
    getItem: function (key) {
      return localStorageData[key];
    },
    removeItem: function () {
      return null;
    },
    setItem: jest.fn(),
  };
})();

describe("WalletRecharge", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  it("should render amount input element and label", () => {
    render(
      <Provider store={store}>
        <Router>
          <WalletRecharge />
        </Router>
      </Provider>
    );

    const inputElement1 = screen.getByPlaceholderText(/1000/i);
    expect(inputElement1).toBeInTheDocument();
  });

  it("should render amount label element", () => {
    render(
      <Provider store={store}>
        <Router>
          <WalletRecharge />
        </Router>
      </Provider>
    );

    const labeElement1 = screen.getByText("Amount");
    expect(labeElement1).toBeInTheDocument();
  });

  it("should render recharge button", () => {
    render(
      <Provider store={store}>
        <Router>
          <WalletRecharge />
        </Router>
      </Provider>
    );

    const buttonElement = screen.getByText("Recharge");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <WalletRecharge />
        </Router>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("#getItem", () => {
    it("returns the user email", () => {
      const result = localStorage.getItem("email");
      expect(result).toEqual("annu");
    });
  });

  it("should be able to type recharge details", () => {
    render(
      <Provider store={store}>
        <Router>
          <WalletRecharge />
        </Router>
      </Provider>
    );

    const textAreaElement1 = screen.getByPlaceholderText(/1000/i);
    fireEvent.change(textAreaElement1, { target: { value: "1000" } });
    expect(textAreaElement1.value).toBe("1000");
  });

  describe("when user puts 0 amount", () => {
    it("Shows error message", () => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <WalletRecharge />
          </Router>
        </Provider>
      );
      act(() => {
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(amountElement, { target: { value: 0 } });
        const { onSubmit } = Form.mock.calls[1][0];
        onSubmit({ preventDefault: jest.fn() });
      });
      expect(queryByTestId("error-msg")).toBeVisible();
    });
  });

  describe("when user puts valid amount", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <WalletRecharge />
          </Router>
        </Provider>
      );
      act(() => {
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(amountElement, { target: { value: 500 } });
        const { onSubmit } = Form.mock.calls[1][0];
        onSubmit({ preventDefault: jest.fn() });
      });
      expect(mockDispatch).toBeCalledWith(recharge());
      expect(recharge).toBeCalledWith({
        email: "annu",
        amount: "500",
        currentAmount: 1000,
      });
    });
  });
});
