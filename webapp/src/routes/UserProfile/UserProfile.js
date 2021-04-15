import { connect } from "react-redux";
import "./UserProfile.scss";

const UserProfile = ({ match, users, recipes }) => {

    const user = users.find(u => u.id === match.params.id);
    const host = window.location.host;
    const userRecipes = recipes.filter(r => user.recipes.includes(r.id));
    const sum = userRecipes.reduce((acc, r) => acc + r.rate, 0);
    const len = userRecipes.reduce((acc, r) => r.rate !== 0 ? acc + 1 : acc, 0);
    const rating = userRecipes.length > 0 ? sum/len : undefined;
    
    return (
        <div className="userProfile">
        <div className="userProfile__left">
            <h1>{user.name}</h1>
            <div className="userProfile__left__image">
              <img src={`http://${host}/${user.picture}`} alt={user.id} />
              <div className="userProfile__left__info">
                  <h4>
                    Recipes:
                  </h4>
                  <small>{user.recipes.length}</small>
              </div>
              <div className="userProfile__left__info">
                  <h4>
                    Rating:
                  </h4>
                  <small>{rating ? `${rating}/5` : "No rates"}</small>
              </div>
            </div>
            
            <h3>
                {user.bio ? user.bio : "No bio..."}
            </h3>
        </div>
        <div className="userProfile__image">
            <img src="/img/userProfile-main-dawg.svg" alt="userProfile-img" />
        </div>


    </div>
    );
};

const mapStateToProps = state => ({
    users: state.users,
    recipes: state.recipes
});

export default connect(mapStateToProps)(UserProfile);