import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { localStorageMock } from "../../../helper/testHelper";
import { signout } from "../../../actions/auth.actions";
import Header from "../index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";
import { getUserEmail } from "../../../helper/localStorageHelper";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("react-bootstrap", () => {
  const Navbar = jest.fn(({ children }) => (
    <div data-testid="Navbar">{children}</div>
  ));
  const Container = jest.fn(({ children }) => (
    <div data-testid="Container">{children}</div>
  ));
  Navbar.Toggle = jest.fn(({ children }) => (
    <div data-testid="Toggle">{children}</div>
  ));
  Navbar.Collapse = jest.fn(({ children }) => (
    <div data-testid="Collapse">{children}</div>
  ));

  const Nav = jest.fn(({ children }) => <div data-tesid="Nav">{children}</div>);
  const Modal = jest.fn(({ children }) => (
    <div data-tesid="Modal">{children}</div>
  ));
  Modal.Header = jest.fn(({ children }) => (
    <div data-testid="Header">{children}</div>
  ));
  Modal.Title = jest.fn(({ children }) => (
    <div data-testid="Title">{children}</div>
  ));
  Modal.Body = jest.fn(({ children }) => (
    <div data-testid="Body">{children}</div>
  ));
  Modal.Footer = jest.fn(({ children }) => (
    <div data-testid="Footer">{children}</div>
  ));
  const Button = jest.fn((props) => (
    <button onClick={props.onClick} data-testid={`${props["data-testid"]}`}>
      {props.children}
    </button>
  ));

  return { Navbar, Container, Nav, Modal, Button };
});

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => <div data-testid="link">{children}</div>),
  NavLink: jest.fn(({ to, "data-testid": dataTestId, children, onClick }) => (
    <a href={to} onClick={onClick} data-testid={dataTestId}>
      {children}
    </a>
  )),
  BrowserRouter: jest.fn(({ children }) => (
    <div data-testid="BrowserRouter">{children}</div>
  )),
}));

jest.mock("../../../actions/auth.actions", () => ({
  signout: jest.fn(() => ({ type: "signout" })),
}));

jest.mock("../../../helper/localStorageHelper", () => ({
  getUserEmail: jest.fn(() => "email"),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("When clicks on signout button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId, queryByRole } = render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      const node = screen.getByText("Signout");
      fireEvent.click(node);
      expect(node).not.toBeNull();
      const confirmNode = queryByTestId("confirm-signout-btn");
      fireEvent.click(confirmNode);
      expect(mockDispatch).toBeCalledWith(signout());
      // const closeButton = queryByTestId("set-modal");
      // fireEvent.click(closeButton);
    });
  });

  describe("When clicks on close button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      const node = screen.getByText("Signout");
      fireEvent.click(node);
      expect(node).not.toBeNull();

      const closeButton = queryByTestId("set-modal");
      fireEvent.click(closeButton);
    });
  });
});
