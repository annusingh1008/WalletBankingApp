import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const localStorageData = {
  email: "annu",
  password: "1234",
};

export const localStorageMock = (function () {
  return {
    getItem: function (key) {
      return localStorageData[key];
    },
    setItem: jest.fn(),
  };
})();

const mockStore = configureMockStore();

export const renderWithRedux = (ui, { store } = {}) => {
  return {
    ...render(<Provider store={mockStore(store)}>{ui}</Provider>),
    store,
  };
};
