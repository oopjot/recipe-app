import { applyMiddleware, combineReducers, createStore } from "redux";
import recipesReducer from "./recipes/reducers";
import usersReducer from "./users/reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import loginReducer from "./auth/reducers";


const rootReducer = combineReducers({
    auth: loginReducer,
    users: usersReducer,
    recipes: recipesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;