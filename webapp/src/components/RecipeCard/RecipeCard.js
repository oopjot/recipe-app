import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { apiDeleteRecipe } from "../../state/recipes/operations";
import Button from "../Button/Button";
import "./RecipeCard.scss";

const RecipeCard = ({ id, name, rate, authorId, user, picture, onDeleteRecipe, deleteButton, ...rest }) => {

  const handleDelete = () => {
    onDeleteRecipe({recipeId: id, author: authorId, picture});
  };

  return (
    <div className="card">
      <Link to={`/recipe/${id}`} className="card__image">
        <img src={picture} alt={picture} />
      </Link>
      <div className="card__body">
        <Link to={`/recipe/${id}`}>
          <h3>{name}</h3>
        </Link>
        <div className="card__body__rate">
          <p>Rate</p>
          <small>{rate === 0 ? "Not rated" : `${rate}/5`}</small>
        </div>
      </div>
      <div className="card__button">
        {deleteButton && user.id === authorId && <Button text="X" deleteBtn onClick={() => handleDelete()} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  onDeleteRecipe: payload => dispatch(apiDeleteRecipe(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);