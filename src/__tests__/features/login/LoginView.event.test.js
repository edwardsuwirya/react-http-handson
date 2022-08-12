import LoginView from "../../../features/Login/LoginView";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {UnauthorizedError} from "../../../shared/errors/AppError";
import {APP_NAVIGATION} from "../../../shared/constants";

const mockOnLogin = jest.fn();
const mockUseNavigate = jest.fn();
jest.mock("../../../shared/hook/UseAuth", () => ({
    useAuth: () => mockOnLogin()
}));
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));
describe('Login View', () => {
    test('Should show error when user name or password empty', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn()
        })
        render(<MemoryRouter><LoginView/></MemoryRouter>)
        const loginButtonElem = screen.getByText('Login');
        fireEvent.click(loginButtonElem);
        await waitFor(() => {
            const errorLabelElem = screen.getByText(/Please input/);
            expect(errorLabelElem).toBeInTheDocument();
        })
    })
    test('Should show error when unauthorized', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockResolvedValue(false)
        })
        render(<MemoryRouter><LoginView/></MemoryRouter>)
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'm'}});
        fireEvent.change(passwordElem, {target: {value: 'm'}});
        const loginButtonElem = screen.getByText('Login');
        fireEvent.click(loginButtonElem);
        await waitFor(() => {
            const errorLabelElem = screen.getByText(/Unauthorized/);
            expect(errorLabelElem).toBeInTheDocument();
        })
    })
    test('Should show error when throw error', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockRejectedValue(new UnauthorizedError())
        })
        render(<MemoryRouter><LoginView/></MemoryRouter>)
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'm'}});
        fireEvent.change(passwordElem, {target: {value: 'm'}});
        const loginButtonElem = screen.getByText('Login');
        fireEvent.click(loginButtonElem);
        await waitFor(() => {
            const errorLabelElem = screen.getByText(/Unauthorized/);
            expect(errorLabelElem).toBeInTheDocument();
        })
    })
    test('Success login', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockResolvedValue(true)
        })
        render(<MemoryRouter><LoginView/></MemoryRouter>)
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'm'}});
        fireEvent.change(passwordElem, {target: {value: 'm'}});
        const loginButtonElem = screen.getByText('Login');
        fireEvent.click(loginButtonElem);
        await waitFor(() => {
            expect(mockUseNavigate).toHaveBeenCalledWith(APP_NAVIGATION.MAIN, {replace: true})
        })
    })
})