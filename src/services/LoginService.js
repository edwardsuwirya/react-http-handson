import {SERVICE} from "../shared/constants";

export const loginService = ({doPost, doGet}) => {
    const doAuthenticate = async (userCred) => {
        try {
            return await doPost({
                url: SERVICE.LOGIN, data: {
                    userName: userCred.userName,
                    password: userCred.password
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    const doGetUser = async () => {
        try {
            return await doGet({
                url: SERVICE.USER_INFO
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    return {
        doAuthenticate, doGetUser
    }
}