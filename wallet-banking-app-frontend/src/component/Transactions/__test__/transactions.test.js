import React from "react";
import { fireEvent } from "@testing-library/react";
import Transactions from "../index";
import { localStorageMock, renderWithRedux } from "../../../helper/testHelper";
import { getAllTransactions } from "../../../actions/transactions.actions";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../Layout", () =>
  jest.fn(({ children }) => <div data-testid="Layout">{children}</div>)
);

jest.mock("react-bootstrap", () => {
  const Table = jest.fn(({ children }) => (
    <table data-testid="Table">{children}</table>
  ));
  const Card = jest.fn(({ children }) => (
    <div data-testid="Card">{children}</div>
  ));
  Card.Footer = jest.fn(({ children }) => (
    <div data-testid="Footer">{children}</div>
  ));
  const InputGroup = jest.fn(({ children }) => (
    <div data-tesid="InputGroup">{children}</div>
  ));
  const Button = jest.fn((props) => (
    <button
      onClick={props.onClick}
      data-testid={`Button-${props["data-testid"]}`}
    >
      {props.children}
    </button>
  ));

  return { Table, Card, InputGroup, Button };
});

jest.mock("../../../actions/transactions.actions", () => ({
  getTransactions: jest.fn(() => ({
    transactions: [
      {
        email: "abc@gmail.com",
        amount: "1000",
        type: "Credit",
        transferAmount: "1000",
        from_name: "Bank",
        to_name: "Annu Singh",
        date: "2022-10-04T05:50:10.283+00:00",
      },
      {
        email: "abc1@gmail.com",
        amount: "1000",
        type: "Credit",
        transferAmount: "1000",
        from_name: "Bank",
        to_name: "Annu Singh",
        date: "2022-10-04T05:50:10.283+00:00",
      },
      {
        email: "abc2@gmail.com",
        amount: "1000",
        type: "Credit",
        transferAmount: "1000",
        from_name: "Bank",
        to_name: "Annu Singh",
        date: "2022-10-04T05:50:10.283+00:00",
      },
    ],
    totalPages: 10,
  })),
  getTotalTransactions: jest.fn((payload) => ({
    type: "getTotalTransactions",
    payload,
  })),
  getAllTransactions: jest.fn((payload) => ({
    type: "getAllTransactions",
    payload,
  })),
}));

describe("Transactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  it("renders properly", () => {
    const { container } = renderWithRedux(<Transactions />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Transactions />);
      const node = queryByTestId("Button-first");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllTransactions(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Transactions />);
      const node = queryByTestId("Button-prev");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllTransactions(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Transactions />);
      const node = queryByTestId("Button-next");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllTransactions(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Transactions />);
      const node = queryByTestId("Button-last");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllTransactions(0, "annu"));
    });
  });
});
