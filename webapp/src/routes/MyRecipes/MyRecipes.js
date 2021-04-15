import { useEffect } from "react";
import { connect } from "react-redux";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import { getRecipes } from "../../state/recipes/operations";
import { userRecipes } from "../../state/recipes/selectors";
import "./MyRecipes.scss"


const MyRecipes = ({ recipes, user, fetchRecipes }) => {

    useEffect(() => fetchRecipes(), [fetchRecipes])

    return (

    <div className="myRecipes">
        <div className="myRecipes__left">
            {recipes.map(r => (<RecipeCard 
                                    key={r.id} 
                                    id={r.id} 
                                    picture={r.picture} 
                                    authorId={r.author} 
                                    author={user.name} 
                                    name={r.name} 
                                    deleteButton 
                                    rate={r.rate} />))}
        </div>
        <div className="myRecipes__form">
            <RecipeForm user={user} />
        </div>
    </div>
    );
};

const mapStateToProps = (state) => ({
    recipes: userRecipes(state),
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: () => dispatch(getRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);