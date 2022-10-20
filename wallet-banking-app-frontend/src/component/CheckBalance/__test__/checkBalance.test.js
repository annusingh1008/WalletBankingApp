import React from 'react';
import { render } from '@testing-library/react'
import CheckBalance from '../index'
import { Provider } from 'react-redux';
import store from '../../../store/index'
import { BrowserRouter as Router } from 'react-router-dom';

describe("Check Balance", () => {
    it('should render all buttons', () => {
        render(<Provider store={store}>
            <Router>
                <CheckBalance />
            </Router>
        </Provider>)

    });

    it('renders properly', () => {
        const { container } = render(<Provider store={store}>
            <Router>
                <CheckBalance />
            </Router>
        </Provider>);
        expect(container.firstChild).toMatchSnapshot();
    });
})