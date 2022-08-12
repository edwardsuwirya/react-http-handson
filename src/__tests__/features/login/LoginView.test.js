import LoginView from "../../../features/Login/LoginView";
import {render, screen} from "@testing-library/react";

const mockUseLogin = jest.fn();
jest.mock('../../../features/Login/UseLogin', () => () => mockUseLogin())
describe('Login View', () => {
    test('Should render', () => {
        mockUseLogin.mockReturnValue({
            viewState: '', userCred: '', handleInputChange: jest.fn(), handleLogin: jest.fn()
        })
        render(<LoginView/>)
        const userNameLabelElem = screen.getByText('User Name');
        expect(userNameLabelElem).toBeInTheDocument();
        const passwordLabelElem = screen.getByText('Password');
        expect(passwordLabelElem).toBeInTheDocument();
        const loginButtonElem = screen.getByText('Login');
        expect(loginButtonElem).toBeInTheDocument();
        expect(loginButtonElem).not.toBeDisabled();
    })
    test('Should disabled button when state is loading', async () => {
        mockUseLogin.mockReturnValue({
            viewState: {isLoading: true, data: null, error: null},
            userCred: '',
            handleInputChange: jest.fn(),
            handleLogin: jest.fn()
        })
        render(<LoginView/>)
        const loginButtonElem = screen.getByText('Login');
        expect(loginButtonElem).toBeDisabled()
    })
    test('Should show error when state error exist', async () => {
        mockUseLogin.mockReturnValue({
            viewState: {isLoading: false, data: null, error: 'Error'},
            userCred: '',
            handleInputChange: jest.fn(),
            handleLogin: jest.fn()
        })
        render(<LoginView/>)
        const errorLabelElem = screen.getByText(/Error/);
        expect(errorLabelElem).toBeInTheDocument();
        const loginButtonElem = screen.getByText('Login');
        expect(loginButtonElem).toBeInTheDocument();
        expect(loginButtonElem).not.toBeDisabled();
    })
})