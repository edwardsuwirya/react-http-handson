import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {AuthContext, AuthProvider} from "../../../shared/context/AuthContext";
import {Provider} from "react-redux";
import {setupStore} from "../../../shared/state/store";
import {useContext, useState} from "react";
import {useDependency} from "../../../shared/hook/UseDependency";
import {useLocalStorage} from "../../../shared/hook/UseLocalStorage";

const TestComponent = () => {
    const {onLogin} = useContext(AuthContext);
    const [result, setResult] = useState(null);
    const handleOnLogin = async () => {
        try {
            const response = await onLogin({})
            if (response) {
                setResult('success')
            }
        } catch (e) {
            setResult('error')
        }
    }
    return (
        <>
            <button data-testid="test-button" onClick={handleOnLogin}>
                Test Login
            </button>
            {result}
        </>
    );
};
jest.mock('../../../shared/hook/UseDependency', () => ({
    useDependency: jest.fn()
}));
jest.mock('../../../shared/hook/UseLocalStorage', () => ({
    useLocalStorage: jest.fn()
}));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
}));
describe('Auth Context', () => {

    test('On Login Success', async () => {
        const mockDoAuthenticate = jest.fn().mockResolvedValue({token: '123'})
        const mockDoGetUser = jest.fn().mockResolvedValue({fullName: 'Dummy'})

        useLocalStorage.mockReturnValue(['123', jest.fn()]);
        useDependency.mockReturnValue({
            loginService: {
                doAuthenticate: mockDoAuthenticate,
                doGetUser: mockDoGetUser
            }
        });
        render(
            <Provider store={setupStore()}>
                <AuthProvider>
                    <TestComponent/>
                </AuthProvider>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("test-button"));
        await waitFor(() => {
                const result = screen.getByText('success');
                expect(result).toBeInTheDocument();
            }
        )
    });
    test('On Login Failed', async () => {
        const mockDoAuthenticate = jest.fn().mockRejectedValue('error');
        useLocalStorage.mockReturnValue(['', jest.fn()]);
        useDependency.mockReturnValue({
            loginService: {
                doAuthenticate: mockDoAuthenticate,
                doGetUser: jest.fn()
            }
        });
        render(
            <Provider store={setupStore()}>
                <AuthProvider>
                    <TestComponent/>
                </AuthProvider>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("test-button"));
        await waitFor(() => {
                const result = screen.getByText('error');
                expect(result).toBeInTheDocument();
            }
        )
    });
    test('On Login no response', async () => {
        const mockDoAuthenticate = jest.fn().mockResolvedValue(null)
        useLocalStorage.mockReturnValue(['', jest.fn()]);
        useDependency.mockReturnValue({
            loginService: {
                doAuthenticate: mockDoAuthenticate,
                doGetUser: jest.fn()
            }
        });
        render(
            <Provider store={setupStore()}>
                <AuthProvider>
                    <TestComponent/>
                </AuthProvider>
            </Provider>
        );
        fireEvent.click(screen.getByTestId("test-button"));
        await waitFor(() => {
            const result = screen.getByText('error');
            expect(result).toBeInTheDocument();
            }
        )
    });
})