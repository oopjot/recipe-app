import { ADD_COMMENT, ADD_RECIPE, ADD_RECIPES, DELETE_COMMENT, DELETE_RECIPE, HIDE_RECIPE, PUBLIC_RECIPE } from "./types";

const addRecipe = (payload) => {
    return {
        type: ADD_RECIPE,
        payload
    };
};

const deleteRecipe = (payload) => {
    return {
        type: DELETE_RECIPE,
        payload
    };
};

const addRecipes = (payload) => {
    return {
        type: ADD_RECIPES,
        payload
    };
};

const hideRecipe = (payload) => {
    return {
        type: HIDE_RECIPE,
        payload
    };
};

const publicRecipe = (payload) => {
    return {
        type: PUBLIC_RECIPE,
        payload
    };
};

const addComment = (payload) => {
    return {
        type: ADD_COMMENT,
        payload
    };
};

const deleteComment = (payload) => {
    return {
        type: DELETE_COMMENT,
        payload
    };
};

export {
    addComment,
    addRecipe,
    addRecipes,
    deleteComment,
    deleteRecipe,
    hideRecipe,
    publicRecipe
};