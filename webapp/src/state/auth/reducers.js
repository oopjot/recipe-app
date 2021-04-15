import { ADD_RECIPE, DELETE_RECIPE } from "../recipes/types";
import { USER_LOGIN, USER_LOGOUT, EDIT_USER } from "./types";

const initialLogin = {
    in: false,
    user: {}
};

const login = (state = initialLogin, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                in: true,
                user: action.payload.user
            };
        case USER_LOGOUT:
            return {
                in: false,
                user: {}
            };
        case EDIT_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    bio: action.payload.bio,
                    picture: action.payload.picture
                }
            };
        case ADD_RECIPE:
            return action.payload.id === state.user.id 
            ? {
                ...state,
                user: {
                    ...state.user,
                    recipes: [
                        ...state.user.recipes,
                        action.payload.recipeId
                    ]
                }
            }
            : state;
            
        case DELETE_RECIPE:
            const reducedRecipes = state.user.recipes.filter(r => r !== action.payload.recipeId);
            return {
                ...state,
                user: {
                    ...state.user,
                    recipes: reducedRecipes
                }
            };
        default:
            return state;
    };
};

export default login;