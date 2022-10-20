import React from 'react';
import { render, screen} from '@testing-library/react'
import Home from '../index'
import { Provider } from 'react-redux';
import store from '../../../store/index'
import { BrowserRouter as Router } from 'react-router-dom';

describe("Home", () => {
    test('should render Layout component', () => {
        render(<Provider store={store}>
            <Router>
                <Home />
            </Router>
        </Provider>)

        // const element = screen.findByRole('layout');
        // expect(element).toBeInTheDocument();
    });
})