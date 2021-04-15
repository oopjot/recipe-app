import { ADD_RECIPE, DELETE_RECIPE } from "../recipes/types";
import { ADD_USER, ADD_USERS, EDIT_USER } from "./types";


const user = (state, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                id: action.payload.id,
                name: action.payload.name,
                bio: "",
                recipes: [],
                picture: "userImages/default.png"
            };
        case EDIT_USER:
            return {
                ...state,
                bio: action.payload.bio,
                picture: action.payload.picture
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [
                    ...state.recipes,
                    action.payload.recipeId
                ]
            };
        case DELETE_RECIPE:
            const reducedRecipes = state.recipes.filter(r => r !== action.payload.recipeId);
            return {
                ...state,
                recipes: reducedRecipes
            };
        default:
            return state;
    };
};

const users = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                user(undefined, action)
            ];
        case ADD_USERS:
            return [
                ...action.payload.users
            ];
        case ADD_RECIPE:
            return state.reduce((acc, u) => {
                return u.id === action.payload.id ? [...acc, user(u, action)] : [...acc, u];
            }, []);
        case DELETE_RECIPE:
            return state.reduce((acc, u) => {
                return u.id === action.payload.id ? [...acc, user(u, action)] : [...acc, u];
            }, []);
        case EDIT_USER:
            return state.reduce((acc, u) => {
                return u.id === action.payload.id ? [...acc, user(u, action)] : [...acc, u];
            }, []);
        default:
            return state;
    };
};

export default users;