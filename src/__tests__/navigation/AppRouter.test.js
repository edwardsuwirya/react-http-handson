import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AppRouter from "../../navigation/AppRouter";
import {Provider} from "react-redux";
import {setupStore} from "../../shared/state/store";

// Error, because Jest hoists mocks to the top
// const mockUseProduct = jest.fn();
// jest.mock('../../features/Product/UseProduct', () => ({
//     useProduct: mockUseProduct
// }));

const mockUseProduct = jest.fn();
jest.mock('../../features/Product/UseProduct', () => () => mockUseProduct())
describe('App Router', () => {
    test('should show login view page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter/>
            </MemoryRouter>
        )
        const userNameElem = screen.getByText(/User Name/)
        expect(userNameElem).toBeInTheDocument();
        const passwordElem = screen.getByText(/Password/)
        expect(passwordElem).toBeInTheDocument();
    });
    test('should show product view page', () => {
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
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const productLabelElem = screen.getByText('Product')
        expect(productLabelElem).toBeInTheDocument();
    });
    test('should show not found view page when path is unknown', () => {
        render(
            <Provider store={setupStore({})}>
                <MemoryRouter initialEntries={['/dummy']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const errorLabelElem = screen.getByText(/Oopss/)
        expect(errorLabelElem).toBeInTheDocument();
    });
    test('should redirect to login', () => {
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: ''}
            })}>
                <MemoryRouter initialEntries={['/main']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const userNameElem = screen.getByText(/User Name/)
        expect(userNameElem).toBeInTheDocument();
    });
});