import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getRecipes } from "../../state/recipes/operations";
import { last10Recipes, top10Recipes } from "../../state/recipes/selectors";
import { getUsers } from "../../state/users/operations";
import "./Home.scss";
import SortInput from "../../components/SortInput/SortInput";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Home = ({ loggedIn, user, top10Recipes, last10Recipes, users, fetchRecipes, fetchUsers, recipes }) => {
  const history = useHistory();

  const [sorted, setSorted] = useState(recipes);

  const [slice, setSlice] = useState("all");

  const [toMap, setToMap] = useState([...top10Recipes]);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const mapIdName = (users) => {
    return users.reduce((acc, u) => {
      return u.id && u.name ? { ...acc, [u.id]: u.name } : acc;
    }, {});
  };

  const nameAuthorFilter = (r) => {
    const byName = r.name.toLowerCase().includes(name.toLowerCase());
    const names = mapIdName(users);
    const byAuthor = names[r.author].toLowerCase().includes(author.toLowerCase());
    return byName && byAuthor;
  };

  useEffect(() => {
    fetchRecipes();
    fetchUsers();
    return slice === "top10"
      ? setToMap([...top10Recipes])
      : slice === "last10"
      ? setToMap([...last10Recipes])
      : slice === "all"
      ? setToMap([...sorted])
      : slice;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRecipes, fetchUsers, sorted, slice]);

  if (!loggedIn) {
    history.push("/login");
    return <></>;
  }

  return (
    <div className="home">
      <Navbar />
      <div className="home__image">
        <img src="/img/home-main-dawg.svg" alt="find your recipe" />
      </div>
      <div className="home__recipes">
        <div className="home__recipes__header">
          <h2>Recipes</h2>
          {slice === "all" && (
            <>
            <div className="home__recipes__header__filters">
              <Input
                utility="filter"
                type="text"
                label="Filter by name"
                active={name !== ""}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                utility="filter"
                type="text"
                label="Filter by author"
                active={author !== ""}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <SortInput sorted={sorted} setSorted={setSorted} />
            </>
          )}
        </div>
        <div className="home__recipes__body">
          <div className="home__recipes__body__buttons">
            <Button text="All" soft active={slice === "all"} primary onClick={() => setSlice("all")} />
            <Button
              text="Top rated"
              primary
              soft
              active={slice === "top10"}
              onClick={() => setSlice("top10")}
            />
            <Button
              text="Most recent"
              primary
              soft
              active={slice === "last10"}
              onClick={() => setSlice("last10")}
            />
          </div>

          <div className="home__recipes__body__cards">
            {toMap
              .filter((r) => nameAuthorFilter(r))
              .map((r) => (
                <RecipeCard
                  key={r.id}
                  id={r.id}
                  picture={r.picture}
                  authorId={r.author}
                  name={r.name}
                  rate={r.rate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.in,
  user: state.auth.user,
  top10Recipes: top10Recipes(state),
  last10Recipes: last10Recipes(state),
  users: state.users,
  recipes: state.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(getRecipes()),
  fetchUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);