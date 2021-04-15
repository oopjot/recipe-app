const { USER_LOGIN, USER_LOGOUT } = require("./types");

const loginUser = (payload) => ({
    type: USER_LOGIN,
    payload
});

const logoutUser = payload => ({
    type: USER_LOGOUT
});

export {
    loginUser,
    logoutUser
};