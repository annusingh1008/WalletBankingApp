import React from 'react';
import { render, screen} from '@testing-library/react'
import Layout from '../index'
import { Provider } from 'react-redux';
import store from '../../../store/index'
import { BrowserRouter as Router } from 'react-router-dom';

describe("Layout", () => {
    it('renders properly', () => {
        const { container } = render(<Provider store={store}>
            <Router>
                <Layout />
            </Router>
        </Provider>);
        expect(container.firstChild).toMatchSnapshot();
    });
})