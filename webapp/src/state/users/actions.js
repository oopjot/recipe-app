import { ADD_USER, ADD_USERS, DELETE_USER, EDIT_USER } from "./types";

const addUser = (payload) => ({
    type: ADD_USER,
    payload
});

const addUsers = (payload) => ({
    type: ADD_USERS,
    payload
});

const deleteUser = (payload) => ({
    type: DELETE_USER,
    payload
});

const editUser = (payload) => ({
    type: EDIT_USER,
    payload
});



export {
    addUser,
    addUsers,
    deleteUser,
    editUser,
};