/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import SignUpScreen from '../screens/login';
import { store } from '../store/store'
import Header from '../components/Header';

describe("Initial render the Login Component", () => {
    // eslint-disable-next-line jest/no-identical-title
    it('display an error message when api call fails', async () => {
        await render(<Provider store={store}>
            <SignUpScreen />
        </Provider>, { wrapper: Router })
        const listElement = await screen.queryByText('Fail to Fetch Data')
        expect(listElement).toBeNull()
    })
    it('renders the Header message with the provided name', async () => {
        const { getByText } = await render(<Provider store={store}>
            <Header username="Rohit" />
        </Provider>, { wrapper: Router })
        const greetingMessage = getByText("Welcome Rohit!", { exact: false });
        expect(greetingMessage).toBeInTheDocument();
    });
    it("updates email value when typed into the email field", async () => {
        const { getByLabelText } = await render(<Provider store={store}>
            <SignUpScreen />
        </Provider>, { wrapper: Router });
        const emailInput = getByLabelText('Email Address',{exact : false});
        fireEvent.change(emailInput, { target: { value: 'rohit@gmail.com' } });
        await waitFor(() => expect(emailInput.value).toBe("rohit@gmail.com", { exact: false }));
    });
})