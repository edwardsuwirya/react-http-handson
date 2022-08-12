import {rest} from "msw";
import {SERVICE} from "../shared/constants";

const URL_PATH = 'http://localhost:3000';

export const login_success_response = rest.post(URL_PATH + SERVICE.LOGIN, (req, res, ctx) => {
    return res(ctx.json({token: 'aaa-bbb-ccc'}))
})

export const login_401_response = rest.post(URL_PATH + SERVICE.LOGIN, (req, res, ctx) => {
    return res(ctx.status(401))
})

export const userInfo_success_response = rest.get(URL_PATH + SERVICE.USER_INFO, (req, res, ctx) => {
    return res(ctx.json({fullName: 'Dummy'}))
});

export const handlers = [login_success_response, login_401_response, userInfo_success_response]