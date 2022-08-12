import {APP_NAVIGATION} from "../../../shared/constants";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import LoginView from "../../../features/Login/LoginView";
import {mswServer} from "../../../testHelpers/mockHttpServer";
import {login_401_response, login_success_response} from "../../../testHelpers/handlers";
import {UnauthorizedError} from "../../../shared/errors/AppError";
import {mswRender} from "../../../testHelpers/customRenders";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));
describe('Login View Test MSW', () => {
    test('User Login Success', async () => {
        mswServer.use(login_success_response);
        mswRender(<LoginView/>)
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'm'}});
        fireEvent.change(passwordElem, {target: {value: 'm'}});
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(mockUseNavigate).toHaveBeenCalledWith(APP_NAVIGATION.MAIN, {replace: true})
        })
    })
    test('User Login 401', async () => {
        mswServer.use(login_401_response)
        mswRender(<LoginView/>)
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'm'}});
        fireEvent.change(passwordElem, {target: {value: 'm'}});
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            const errorLabelElem = screen.getByText(new UnauthorizedError().message);
            expect(errorLabelElem).toBeInTheDocument();
        })
    })
})