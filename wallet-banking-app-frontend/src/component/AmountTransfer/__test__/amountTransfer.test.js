import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AmountTransfer from "../index";
import { Provider } from "react-redux";
import store from "../../../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import { getBalance } from "../../../reducers/balance.reducer";
import { Container, Form } from "react-bootstrap";
import { amountTransfer } from "../../../actions/amountTransfer.action";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../../actions/amountTransfer.action", () => ({
  amountTransfer: jest.fn(() => ({ type: "amountTransfer" })),
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

describe("AmountTransfer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  it("should render amount and email input element", () => {
    render(
      <Provider store={store}>
        <Router>
          <AmountTransfer />
        </Router>
      </Provider>
    );

    const inputElement1 = screen.getByPlaceholderText(/Email/i);
    expect(inputElement1).toBeInTheDocument();
    const inputElement2 = screen.getByPlaceholderText(/1000/i);
    expect(inputElement2).toBeInTheDocument();
  });

  it("should render email and amount label element", () => {
    render(
      <Provider store={store}>
        <Router>
          <AmountTransfer />
        </Router>
      </Provider>
    );

    const labeElement1 = screen.getByText("Email");
    expect(labeElement1).toBeInTheDocument();
    const labeElement2 = screen.getByText("Amount");
    expect(labeElement2).toBeInTheDocument();
  });

  it("should render Amount Transfer button", () => {
    render(
      <Provider store={store}>
        <Router>
          <AmountTransfer />
        </Router>
      </Provider>
    );

    const buttonElement = screen.getByTestId("transferAmountButton");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AmountTransfer />
        </Router>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should be able to type amount transfer details", () => {
    render(
      <Provider store={store}>
        <Router>
          <AmountTransfer />
        </Router>
      </Provider>
    );

    const textAreaElement1 = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(textAreaElement1, { target: { value: "annu@gmail.com" } });
    expect(textAreaElement1.value).toBe("annu@gmail.com");

    const textAreaElement2 = screen.getByPlaceholderText(/1000/i);
    fireEvent.change(textAreaElement2, { target: { value: "1000" } });
    expect(textAreaElement2.value).toBe("1000");
  });

  describe("#getItem", () => {
    it("returns the user email", () => {
      const result = localStorage.getItem("email");
      expect(result).toEqual("annu");
    });
  });

  describe("when user puts insufficient amount", () => {
    it("Shows insufficient amount", () => {
      const { container, queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <AmountTransfer />
          </Router>
        </Provider>
      );
      act(() => {
        const emailElement = screen.queryByTestId("emailInputBox");
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(emailElement, { target: { value: "annu@gmail.com" } });
        fireEvent.change(amountElement, { target: { value: 20000 } });
        const { onSubmit } = Form.mock.calls[2][0];
        onSubmit({ preventDefault: jest.fn() });
      });
      expect(queryByTestId("insufficient-amount")).toBeVisible();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("when user puts insufficient amount", () => {
    it("Shows insufficient amount", () => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <AmountTransfer />
          </Router>
        </Provider>
      );
      act(() => {
        const emailElement = screen.queryByTestId("emailInputBox");
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(emailElement, { target: { value: "annu@gmail.com" } });
        fireEvent.change(amountElement, { target: { value: 20000 } });
        const { onSubmit } = Form.mock.calls[2][0];
        onSubmit({ preventDefault: jest.fn() });
      });
      expect(queryByTestId("insufficient-amount")).toBeVisible();
    });
  });

  describe("when user puts 0 amount", () => {
    it("Shows error message", () => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <AmountTransfer />
          </Router>
        </Provider>
      );
      act(() => {
        const emailElement = screen.queryByTestId("emailInputBox");
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(emailElement, { target: { value: "annu@gmail.com" } });
        fireEvent.change(amountElement, { target: { value: 0 } });
        const { onSubmit } = Form.mock.calls[2][0];
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
            <AmountTransfer />
          </Router>
        </Provider>
      );
      act(() => {
        const emailElement = screen.queryByTestId("emailInputBox");
        const amountElement = screen.queryByTestId("amountInputBox");
        fireEvent.change(emailElement, { target: { value: "annu@gmail.com" } });
        fireEvent.change(amountElement, { target: { value: 500 } });
        const { onSubmit } = Form.mock.calls[2][0];
        onSubmit({ preventDefault: jest.fn() });
      });
      expect(mockDispatch).toBeCalledWith(amountTransfer());
      expect(amountTransfer).toBeCalledWith({
        email: "annu",
        amount: "500",
        creditToEmail: "annu@gmail.com",
        currentAmount: 1000,
      });
    });
  });
});
