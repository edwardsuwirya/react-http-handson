import {DependencyProvider} from "../shared/context/DependencyContext";
import {AuthProvider} from "../shared/context/AuthContext";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import {apiClientFactory} from "../shared/ApiClientFactory";
import {clientInstance} from "../shared/AxiosClient";
import {serviceFactory} from "../services/ServiceFactory";
import {setupStore} from "../shared/state/store";
import {MemoryRouter} from "react-router-dom";

export const mswRender = (wrappedUi, {...renderOptions} = {}) => {
    const apiClient = apiClientFactory(clientInstance);
    const services = serviceFactory(apiClient);
    const store = setupStore();
    const Wrapper = ({children}) => {
        return (
            <Provider store={store}>
                <DependencyProvider services={services}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </DependencyProvider></Provider>
        )
    }
    return render(wrappedUi, {wrapper: Wrapper, ...renderOptions})
}

export const memoryRouterRender = (wrappedUi, {
    entry = '/',
    preloadedState = {},
    ...renderOptions
} = {}) => {
    const Wrapper = ({children}) => {
        return (
            <Provider store={setupStore(preloadedState)}>
                <MemoryRouter initialEntries={[entry]}>
                    {children}
                </MemoryRouter>
            </Provider>
        )
    }
    return render(wrappedUi, {wrapper: Wrapper, ...renderOptions})
}

export const reduxRender = (wrappedUi, {
    preloadedState = {},
    ...renderOptions
} = {}) => {
    const Wrapper = ({children}) => {
        return (
            <Provider store={setupStore(preloadedState)}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </Provider>
        )
    }
    return render(wrappedUi, {wrapper: Wrapper, ...renderOptions})
}