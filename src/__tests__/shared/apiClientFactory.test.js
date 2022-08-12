import {apiClientFactory} from "../../shared/ApiClientFactory";

describe('Api Client Factory', () => {
    let client;
    const mockPost = jest.fn();
    const mockGet = jest.fn();
    beforeAll(() => {
        const mockClient = jest.fn().mockReturnValue({
            get: mockGet,
            post: mockPost
        })
        client = apiClientFactory(mockClient())
    });
    test('Success doPost', async () => {
        mockPost.mockResolvedValue({data: true});
        const response = await client.doPost({});
        expect(response).toBeTruthy()
    });
    test('Failed doPost', async () => {
        mockPost.mockRejectedValue('error');
        await expect(client.doPost({})).rejects.toThrow('error')
    });
    test('Success doGet', async () => {
        mockGet.mockResolvedValue({data: true});
        const response = await client.doGet({});
        expect(response).toBeTruthy()
    });
    test('Failed doGet', async () => {
        mockGet.mockRejectedValue('error');
        await expect(client.doGet({})).rejects.toThrow('error')
    });
})