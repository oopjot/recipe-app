import { ADD_RECIPE, DELETE_RECIPE, ADD_RECIPES, HIDE_RECIPE, PUBLIC_RECIPE, ADD_COMMENT, DELETE_COMMENT } from "./types";

const getRate = (rate, comments) => {
    const length = comments.length;
    const sum = comments.reduce((acc, c) => acc + c.rate, 0);
    const newRate = Math.round((sum/length)*100)/100;
    return length === 0 ? 0 : newRate;
};

const recipe = (state, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return {
                id: action.payload.recipeId,
                name: action.payload.name,
                description: action.payload.description,
                ingredients: action.payload.ingredients,
                comments: [],
                rate: 0,
                picture: action.payload.picture,
                author: action.payload.author
            };
        case HIDE_RECIPE:
            return {
                ...state,
                hidden: true
            };
        case PUBLIC_RECIPE:
            return {
                ...state,
                hidden: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload.comment
                ],
                rate: getRate(state.rate, [...state.comments, action.payload.comment])
            };
        case DELETE_COMMENT:
            const reducedComments = state.comments.filter(c => c.commentId !== action.payload.commentId);
            return {
                ...state,
                comments: reducedComments,
                rate: getRate(state.rate, reducedComments)
            };
        default:
            return state;
    };
};

const recipes = (state = [], action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return [
                ...state,
                recipe(undefined, action)
            ];
        case DELETE_RECIPE:
            return state.filter(r => r.id !== action.payload.recipeId);
        case ADD_RECIPES:
            return [
                ...action.payload.recipes.map(r => ({
                    id: r.recipeId,
                    name: r.name,
                    description: r.description,
                    ingredients: r.ingredients,
                    comments: r.comments,
                    rate: r.rate,
                    picture: r.picture,
                    author: r.author
                }))
            ];
        case HIDE_RECIPE:
            return state.reduce((acc, r) => {
                return r.id === action.payload.recipeId ? [...acc, recipe(r, action)] : [...acc, r];
            }, []);
        case PUBLIC_RECIPE:
            return state.reduce((acc, r) => {
                return r.id === action.payload.recipeId ? [...acc, recipe(r, action)] : [...acc, r];
            }, []);
        case ADD_COMMENT:
            return state.reduce((acc, r) => {
                return r.id === action.payload.recipeId ? [...acc, recipe(r, action)] : [...acc, r];
            }, []);
        case DELETE_COMMENT:
            return state.reduce((acc, r) => {
                return r.id === action.payload.recipeId ? [...acc, recipe(r, action)] : [...acc, r];
            }, []);
          
        default:
            return state;
    };
};

export default recipes;