import React from "react";
import { fireEvent } from "@testing-library/react";
import Cashback from "../index";
import { getAllCashBacks } from "../../../actions/cashback.actions";
import { localStorageMock, renderWithRedux } from "../../../helper/testHelper";

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

jest.mock("../../../actions/cashback.actions", () => ({
  getCashbacks: jest.fn(() => ({
    cashbackList: [
      {
        email: "abc@gmail.com",
        prev_amount: 15000,
        cashback_amount: 1000,
        current_amount: 16000,
        date: "2022-10-07T09:47:02.906+00:00",
      },
      {
        email: "abc2@gmail.com",
        prev_amount: 15000,
        cashback_amount: 1000,
        current_amount: 16000,
        date: "2022-10-07T09:47:02.906+00:00",
      },
      {
        email: "abc3@gmail.com",
        prev_amount: 15000,
        cashback_amount: 1000,
        current_amount: 16000,
        date: "2022-10-07T09:47:02.906+00:00",
      },
    ],
    totalPages: 10,
  })),
  getTotalCashbacks: jest.fn((payload) => ({
    type: "getTotalCashbacks",
    payload,
  })),
  getAllCashBacks: jest.fn((payload) => ({
    type: "getAllCashBacks",
    payload,
  })),
}));

describe("Cashback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  it("renders properly", () => {
    const { container } = renderWithRedux(<Cashback />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Cashback />);
      const node = queryByTestId("Button-first");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllCashBacks(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Cashback />);
      const node = queryByTestId("Button-prev");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllCashBacks(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Cashback />);
      const node = queryByTestId("Button-next");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllCashBacks(0, "annu"));
    });
  });

  describe("When clicks on first button", () => {
    it("dispatches proper action", () => {
      const { queryByTestId } = renderWithRedux(<Cashback />);
      const node = queryByTestId("Button-last");
      fireEvent.click(node);
      expect(mockDispatch).toBeCalledWith(getAllCashBacks(0, "annu"));
    });
  });
});
