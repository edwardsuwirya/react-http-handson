import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AppRouter from "../../navigation/AppRouter";
import {setupStore} from "../../shared/state/store";
import {Provider} from "react-redux";
import {AuthProvider} from "../../shared/context/AuthContext";

const mockUseProduct = jest.fn();
// export const
// jest.mock('../../features/Product/UseProduct', () => ({
//     useProduct: () => mockUseProduct()
// }));
jest.mock('../../features/Product/UseProduct', () => () => mockUseProduct())
describe('Navigation', () => {
    test('should show product view page with data', async () => {
        mockUseProduct.mockReturnValue({
            viewState: {
                isLoading: false, data: [{
                    id: '1', productName: 'dummy product 1', productInfo: 'dummy product info 1'
                }, {
                    id: '2', productName: 'dummy product 2', productInfo: 'dummy product info 2'
                }], error: null
            }
        })
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: 'dummy'}
            })}>
                <MemoryRouter initialEntries={['/main/product']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const productButtonElem = screen.getByText(/Product/)
        expect(productButtonElem).toBeInTheDocument();
        fireEvent.click(productButtonElem);
        await waitFor(() => {
            const result = screen.getByText('dummy product 1');
            expect(result).toBeInTheDocument();
        })
        await waitFor(() => {
            const listItems = screen.getAllByRole('listitem')
            expect(listItems).toHaveLength(2)
        })
    });

    test('should have button logout with name and go to login when clicked', async () => {
        mockUseProduct.mockReturnValue({
            viewState: {
                isLoading: false, data: null, error: null
            }
        })
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: 'dummy'}
            })}>
                <MemoryRouter initialEntries={['/main/product']}>
                    <AuthProvider>
                        <AppRouter/>
                    </AuthProvider>
                </MemoryRouter>
            </Provider>
        )
        const logoutButtonElem = screen.getByText('Logout dummy')
        expect(logoutButtonElem).toBeInTheDocument();

        fireEvent.click(logoutButtonElem);
        await waitFor(() => {
            const userNameElem = screen.getByText(/User Name/)
            expect(userNameElem).toBeInTheDocument();
        })
    })
})