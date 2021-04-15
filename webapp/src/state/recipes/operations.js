import axios from "axios";
import { addComment, addRecipe, addRecipes, deleteComment, deleteRecipe } from "./actions";

const getRecipes = () => 
    dispatch => {
        axios.get("/recipes")
            .then(res => {
                const recipes = res.data.map(r => ({
                    recipeId: r._id,
                    name: r.name,
                    description: r.description,
                    ingredients: r.ingredients,
                    picture: r.picture,
                    comments: r.comments,
                    rate: r.rate,
                    hidden: r.hidden,
                    author: r.author
                }));
                dispatch(addRecipes({recipes}));
            })
            .catch(err => console.log(err));
    };

const postRecipe = payload => 
    dispatch => {
        axios.post(`/recipes/${payload.id}`, payload.body)
        .then(res => {
            const recipe = {
                id: payload.id,
                recipeId: res.data._id,
                name: res.data.name,
                description: res.data.description,
                ingredients: res.data.ingredients,
                picture: res.data.picture,
                comments: res.data.comments,
                rate: res.data.rate,
                author: res.data.author
            };
            dispatch(addRecipe(recipe));
        })
        .catch(err => console.log(err));
    };

const apiDeleteRecipe = payload =>
    dispatch => {
        axios.delete(`/recipes/${payload.recipeId}`, { data: { author: payload.author, picture: payload.picture }, headers: { "Authorization": "***" } })
        .then(res => {
            dispatch(deleteRecipe({id: res.data.authorId, recipeId: res.data.deletedId}));
        })
        .catch(err => console.log(err));
    };

const postComment = payload =>
    dispatch => {
        axios.post(`/recipes/comment/${payload.recipeId}`, { ...payload.comment })
            .then(res => {
                dispatch(addComment({ recipeId: payload.recipeId, comment: res.data }));
            })
            .catch(err => console.log(err));
    };

const apiDeleteComment = payload =>
    dispatch => {
        axios.delete(`/recipes/${payload.recipeId}/comment/${payload.commentId}`)
            .then(res => dispatch(deleteComment({...res.data})))
            .catch(err => console.log(err)); 
    };


export {
    postRecipe,
    getRecipes,
    apiDeleteRecipe,
    postComment,
    apiDeleteComment
};