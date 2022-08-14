import {loginService} from "../../services/LoginService";
import {SERVICE} from "../../shared/constants";

describe('Login Service', () => {
    test('Success authenticate', async () => {
        const mockDoPost = jest.fn();
        mockDoPost.mockResolvedValue('success');
        const client = jest.fn().mockReturnValue({
            doPost: mockDoPost
        })
        const service = loginService(client());
        const response = await service.doAuthenticate({
            userName: 'dummyUser', password: 'dummyPassword'
        });
        expect(mockDoPost).toHaveBeenCalledWith({
            url: SERVICE.LOGIN, data: {
                userName: 'dummyUser', password: 'dummyPassword'
            }
        })
        expect(response).toBe('success');
    });
    test('Failed Authenticate', async () => {
        const mockDoPost = jest.fn();
        mockDoPost.mockRejectedValue(new Error('error'));
        const client = jest.fn().mockReturnValue({
            doPost: mockDoPost
        })
        const service = loginService(client());
        await expect(service.doAuthenticate({})).rejects.toThrow('error')
    });
    test('Success Get User', async () => {
        const mockDoGet = jest.fn();
        mockDoGet.mockResolvedValue('success');
        const client = jest.fn().mockReturnValue({
            doGet: mockDoGet
        })
        const service = loginService(client());
        const response = await service.doGetUser();
        expect(response).toBe('success');
    });
    test('Failed Get User', async () => {
        const mockDoGet = jest.fn();
        mockDoGet.mockRejectedValue(new Error('error'));
        const client = jest.fn().mockReturnValue({
            doGet: mockDoGet
        })
        const service = loginService(client());
        await expect(service.doGetUser()).rejects.toThrow('error')
    });
})