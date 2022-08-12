import {render, screen} from "@testing-library/react";
import ProductView from "../../../features/Product/ProductView";

// export default
const mockUseProduct = jest.fn();
jest.mock('../../../features/Product/UseProduct', () => () => mockUseProduct())
describe('Product View', () => {
    test('Should render', () => {
        mockUseProduct.mockReturnValue({
            viewState: {isLoading: false, data: null, error: null}
        })
        render(<ProductView/>);
        const noProductLabelElem = screen.getByText('No Product');
        expect(noProductLabelElem).toBeInTheDocument();
    })
    test('Should display loading', async () => {
        mockUseProduct.mockReturnValue({
            viewState: {isLoading: true, data: null, error: null}
        })
        render(<ProductView/>)
        const loadingLabelElem = screen.getByText('Loading');
        expect(loadingLabelElem).toBeInTheDocument()
    })
    test('Should display product list', async () => {
        mockUseProduct.mockReturnValue({
            viewState: {
                isLoading: false, data: [{
                    id: '1', productName: 'dummy product 1', productInfo: 'dummy product info 1'
                }, {
                    id: '2', productName: 'dummy product 2', productInfo: 'dummy product info 2'
                }], error: null
            }
        })
        render(<ProductView/>)
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(2)
    })
})