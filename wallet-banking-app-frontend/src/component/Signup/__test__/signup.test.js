import React from "react";
import { fireEvent } from "@testing-library/react";
import Signup from "../index";
import { localStorageMock, renderWithRedux } from "../../../helper/testHelper";
import { signup } from "../../../actions/user.actions";
import { Form } from "react-bootstrap";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../Layout", () =>
  jest.fn(({ children }) => <div data-testid="Layout">{children}</div>)
);

// jest.mock("react-bootstrap", () => {
//   const Container = jest.fn(({ children }) => (
//     <table data-testid="Container">{children}</table>
//   ));
//   const Row = jest.fn(({ children }) => (
//     <div data-testid="Row">{children}</div>
//   ));
//   const Col = jest.fn(({ children }) => (
//     <div data-testid="Col">{children}</div>
//   ));
//   const Form = jest.fn(({ children }) => (
//     <div data-tesid="Form">{children}</div>
//   ));
//   const Button = jest.fn((props) => (
//     <button onClick={props.onClick} data-testid={`${props["data-testid"]}`}>
//       {props.children}
//     </button>
//   ));

//   return { Container, Row, Col, Form, Button };
// });

jest.mock("../../../actions/user.actions", () => ({
  signup: jest.fn(() => ({ type: "signup" })),
  getUser: jest.fn(() => ({
    error: null,
    message: "",
    loading: false,
  })),
}));

describe("Signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  it("renders properly", () => {
    const { container } = renderWithRedux(<Signup />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("When clicks on first button", () => {
    it("should render signup textarea element", () => {
      const { queryByTestId } = renderWithRedux(<Signup />);

      const textAreaElement1 = queryByTestId("inputFirstName");
      expect(textAreaElement1).toBeInTheDocument();

      const textAreaElement2 = queryByTestId("inputLastName");
      expect(textAreaElement2).toBeInTheDocument();

      const textAreaElement3 = queryByTestId("inputEmail");
      expect(textAreaElement3).toBeInTheDocument();

      const textAreaElement4 = queryByTestId("inputPassword");
      expect(textAreaElement4).toBeInTheDocument();

      const textAreaElement5 = queryByTestId("inputConfirmPassword");
      expect(textAreaElement5).toBeInTheDocument();

      const textAreaElement6 = queryByTestId("inputMobileNumber");
      expect(textAreaElement6).toBeInTheDocument();
    });

    it("should be able to type signup details", () => {
      const { queryByTestId } = renderWithRedux(<Signup />);

      const textAreaElement1 = queryByTestId("inputFirstName");
      fireEvent.change(textAreaElement1, {
        target: { value: "Annu" },
      });
      expect(textAreaElement1.value).toBe("Annu");

      const textAreaElement2 = queryByTestId("inputLastName");
      fireEvent.change(textAreaElement2, { target: { value: "Singh" } });
      expect(textAreaElement2.value).toBe("Singh");

      const textAreaElement3 = queryByTestId("inputEmail");
      fireEvent.change(textAreaElement3, {
        target: { value: "annu@gmail.com" },
      });
      expect(textAreaElement3.value).toBe("annu@gmail.com");

      const textAreaElement4 = queryByTestId("inputPassword");
      fireEvent.change(textAreaElement4, { target: { value: "1234" } });
      expect(textAreaElement4.value).toBe("1234");

      const textAreaElement5 = queryByTestId("inputConfirmPassword");
      fireEvent.change(textAreaElement5, { target: { value: "1234" } });
      expect(textAreaElement5.value).toBe("1234");

      const textAreaElement6 = queryByTestId("inputMobileNumber");
      fireEvent.change(textAreaElement6, { target: { value: "1234567890" } });
      expect(textAreaElement6.value).toBe("1234567890");
    });

    it("should have empty textarea when submit button is clicked", () => {
      const { queryByTestId } = renderWithRedux(<Signup />);

      const buttonElement = queryByTestId("submit-btn");

      const textAreaElement1 = queryByTestId("inputFirstName");
      fireEvent.change(textAreaElement1, {
        target: { value: "" },
      });

      const textAreaElement2 = queryByTestId("inputLastName");
      fireEvent.change(textAreaElement2, { target: { value: "" } });

      const textAreaElement3 = queryByTestId("inputEmail");
      fireEvent.change(textAreaElement3, {
        target: { value: "" },
      });

      const textAreaElement4 = queryByTestId("inputPassword");
      fireEvent.change(textAreaElement4, { target: { value: "" } });

      const textAreaElement5 = queryByTestId("inputConfirmPassword");
      fireEvent.change(textAreaElement5, { target: { value: "" } });

      const textAreaElement6 = queryByTestId("inputMobileNumber");
      fireEvent.change(textAreaElement6, { target: { value: "" } });

      fireEvent.click(buttonElement);

      expect(textAreaElement1.value).toBe("");
      expect(textAreaElement2.value).toBe("");
      expect(textAreaElement3.value).toBe("");
      expect(textAreaElement4.value).toBe("");
      expect(textAreaElement5.value).toBe("");
      expect(textAreaElement6.value).toBe("");
    });

    it("dispatches proper action", () => {
      const { container, queryByTestId } = renderWithRedux(<Signup />);
      const firstNameElement = queryByTestId("inputFirstName");
      const lastNameElement = queryByTestId("inputLastName");
      const emailElement = queryByTestId("inputEmail");
      const passwordElement = queryByTestId("inputPassword");
      const confirmPasswordElement = queryByTestId("inputConfirmPassword");
      const mobileNumberElement = queryByTestId("inputMobileNumber");
      fireEvent.change(firstNameElement, { target: { value: "Annu" } });
      fireEvent.change(lastNameElement, { target: { value: "Singh" } });
      fireEvent.change(emailElement, { target: { value: "annu@gmail.com" } });
      fireEvent.change(passwordElement, { target: { value: "1234" } });
      fireEvent.change(confirmPasswordElement, {
        target: { value: "abcdefgh" },
      });
      fireEvent.change(mobileNumberElement, {
        target: { value: "1234567890" },
      });
      expect(container.firstChild).toMatchSnapshot();
      const node = queryByTestId("submit-btn");
      fireEvent.click(node);
      fireEvent.submit(queryByTestId("submit-form"));
    });
  });
});
