import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signin from "../index";
import { Provider } from "react-redux";
import store from "../../../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import { getAuthDetails, login } from "../../../actions/auth.actions";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../../actions/auth.actions", () => ({
  getAuthDetails: jest.fn(() => ({
    user: {
      firstName: "Annu",
      lastName: "Singh",
      email: "annu@gmail.com",
      password: "12345678",
      amount: "1000",
    },
    authenticate: false,
    loading: false,
    error: null,
  })),
  login: jest.fn((payload) => ({
    type: "login",
    payload,
  })),
}));

describe("Signin", () => {
  it("should render email and password textarea element", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const textAreaElement1 = screen.getByPlaceholderText(/Email/i);
    expect(textAreaElement1).toBeInTheDocument();
    const textAreaElement2 = screen.getByPlaceholderText(/Password/i);
    expect(textAreaElement2).toBeInTheDocument();
  });

  it("should render email and password label element", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const labeElement1 = screen.getByText("Email");
    expect(labeElement1).toBeInTheDocument();
    const labeElement2 = screen.getByText("Password");
    expect(labeElement2).toBeInTheDocument();
  });

  it("should be able to type email and password", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const textAreaElement1 = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(textAreaElement1, { target: { value: "annu@gmail.com" } });
    expect(textAreaElement1.value).toBe("annu@gmail.com");

    const textAreaElement2 = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(textAreaElement2, { target: { value: "1234" } });
    expect(textAreaElement2.value).toBe("1234");
  });

  it("should render submit button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("Form can be submitted", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );
    fireEvent.click(queryByTestId("submit-btn"));
    fireEvent.submit(queryByTestId("input-form"));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("authenticate is true ", () => {
    getAuthDetails.mockImplementationOnce(() => ({
      user: {
        firstName: "Annu",
        lastName: "Singh",
        email: "annu@gmail.com",
        password: "12345678",
        amount: "1000",
      },
      authenticate: true,
      loading: false,
      error: null,
    }));
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
