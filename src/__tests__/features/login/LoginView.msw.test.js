import {APP_NAVIGATION} from "../../../shared/constants";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import LoginView from "../../../features/Login/LoginView";
import {DependencyProvider} from "../../../shared/context/DependencyContext";
import {serviceFactory} from "../../../services/ServiceFactory";
import {apiClientFactory} from "../../../shared/ApiClientFactory";
import {clientInstance} from "../../../shared/AxiosClient";
import {AuthProvider} from "../../../shared/context/AuthContext";
import {setupStore} from "../../../shared/state/store";
import {Provider} from "react-redux";
import {mswServer} from "../../../testHelpers/mockHttpServer";
import {login_401_response, login_success_response} from "../../../testHelpers/handlers";
import {UnauthorizedError} from "../../../shared/errors/AppError";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));
describe('Login View Test MSW', () => {
    const apiClient = apiClientFactory(clientInstance);
    const services = serviceFactory(apiClient);
    const store = setupStore();

    test('User Login Success', async () => {
        mswServer.use(login_success_response)
        render(<Provider store={store}>
            <DependencyProvider services={services}>
                <AuthProvider>
                    <LoginView/>
                </AuthProvider>
            </DependencyProvider></Provider>);
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
        render(<Provider store={store}>
            <DependencyProvider services={services}>
                <AuthProvider>
                    <LoginView/>
                </AuthProvider>
            </DependencyProvider></Provider>);
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