import {productService} from "../../services/ProductService";

describe('Product Service', () => {
    test('Get All Product', async () => {
        const mockDoGet = jest.fn();
        mockDoGet.mockResolvedValue('success');
        const client = jest.fn().mockReturnValue({
            doGet: mockDoGet
        })
        const service = productService(client());
        const response = await service.getAllProduct();
        expect(response).toBe('success')
    });
    test('Failed Get All Product', async () => {
        const mockDoGet = jest.fn();
        mockDoGet.mockRejectedValue(new Error('error'));
        const client = jest.fn().mockReturnValue({
            doGet: mockDoGet
        })
        const service = productService(client());
        await expect(service.getAllProduct()).rejects.toThrow('error')
    });
})