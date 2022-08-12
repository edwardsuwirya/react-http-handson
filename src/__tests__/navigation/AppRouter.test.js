import {screen} from "@testing-library/react";
import AppRouter from "../../navigation/AppRouter";
import {memoryRouterRender} from "../../testHelpers/customRenders";

// Error, because Jest hoists mocks to the top
// const mockUseProduct = jest.fn();
// jest.mock('../../features/Product/UseProduct', () => ({
//     useProduct: mockUseProduct
// }));

const mockUseProduct = jest.fn();
jest.mock('../../features/Product/UseProduct', () => () => mockUseProduct())
describe('App Router', () => {
    test('should show login view page', () => {
        memoryRouterRender(<AppRouter/>);
        const userNameElem = screen.getByText(/User Name/);
        expect(userNameElem).toBeInTheDocument();
        const passwordElem = screen.getByText(/Password/);
        expect(passwordElem).toBeInTheDocument();
    });
    test('should show product view page', () => {
        mockUseProduct.mockReturnValue({
            viewState: {
                isLoading: false, data: null, error: null
            }
        });
        memoryRouterRender(<AppRouter/>, {
            entry: '/main/product',
            preloadedState: {
                userInfoReducer: {name: 'dummy'}
            }
        });
        const userNameElem = screen.getByText('Product')
        expect(userNameElem).toBeInTheDocument();
    });
    test('should show not found view page when path is unknown', () => {
        memoryRouterRender(<AppRouter/>, {
            entry: '/dummy'
        });
        const userNameElem = screen.getByText(/Oopss/);
        expect(userNameElem).toBeInTheDocument();
    });
});