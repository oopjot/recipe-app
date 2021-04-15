import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm";
import { apiDeleteComment, getRecipes } from "../../state/recipes/operations";
import "./Recipe.scss"

const Recipe = ({ match, recipes, user, users, fetchRecipes, onDeleteComment }) => {

    const recipe = recipes.find(r => r.id === match.params.id);
    const author = users.find(u => u.recipes.includes(match.params.id));
    const host = window.location.host;
    const comments = [...recipe.comments].reverse();

    useEffect(() => fetchRecipes(), [fetchRecipes])


    if (!recipe) return (<Redirect to={"/home"} />)
    return (
    <div className="recipe">
        <h1>{recipe.name.toUpperCase()}</h1>
        <div className="recipe__userInfo">
            <small>
                By: <Link to={`/profile/${author.id}`}>
                    {author.name}
                </Link>
            </small>
            <small>
                Rate: {recipe.rate === 0 ? "Not rated" : recipe.rate}
            </small>                        
        </div>
        <div className="recipe__img">
            <img src={`http://${host}/${recipe.picture}`} alt={recipe.id} />
        </div>
        <div className="recipe__body">
            <div className="recipe__body__ingredients">
                <h5>Ingredients:</h5>
                <ul>
                    {recipe.ingredients.map((i, index) => (<li>
                            <small key={index}>{i.amount}</small> {i.name}
                    </li>))}    
                </ul>
            </div>
            <div className="recipe__body__description">
                <h5>Description:</h5>
                <p>{recipe.description}</p>
            </div>
            

        </div>
        <div className="recipe__commentSection">
            <h2>Comments</h2>

            {comments.map(c => (
                <Comment 
                    key={c.commentId} 
                    author={c.author} 
                    authorName={c.authorName} 
                    text={c.text} rate={c.rate} 
                    onDeleteComment={onDeleteComment}
                    recipeId={recipe.id} 
                    id={c.commentId} />
            ))}
        





        <CommentForm 
            fetchRecipes={fetchRecipes} 
            recipeId={recipe.id} />
        </div>

    </div>);
};

const mapStateToProps = state => ({
    recipes: state.recipes,
    user: state.auth.user,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: () => dispatch(getRecipes()),
    onDeleteComment: payload => dispatch(apiDeleteComment(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);