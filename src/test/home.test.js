import { store } from '../store/store'
import React from 'react';
import { render , screen,  } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import HomeScreen from '../screens/home'
describe("Initial render the Login Component", () => {
    const userList = [
        {
            "name": "admin",
            "email": "admin123@gmail.co",
            "event": "React",
            "primaryskills": "Web-Dev",
            "id": "1"
          },
    ]
    it("render the userlist of datas", async () => {
        await render(<Provider store={store}>
            <HomeScreen />
        </Provider>, { wrapper: Router })
        expect(userList).not.toHaveLength(0)
    })
    it('display an error message when api call fails', async () => {
        await render(<Provider store={store}>
             <HomeScreen />
        </Provider>, { wrapper: Router })
        const listElement = screen.queryByText('Fail to Fetch Data')
        expect(listElement).toBeNull()
    })
})