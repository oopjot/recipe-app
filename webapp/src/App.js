import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import MyRecipes from "./routes/MyRecipes/MyRecipes";
import Login from "./routes/Login/Login";
import Profile from "./routes/Profile/Profile";
import Register from "./routes/Register/Register";
import UserProfile from "./routes/UserProfile/UserProfile";
import Recipe from "./routes/Recipe/Recipe";
import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import "./App.scss";

const App = ({ auth }) => {

  const getSwitch = (authorized) => {
    if (!authorized) {
      return (
        <Switch>
          <Route exact path="/login">
            {auth.in ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/register" component={Register} />
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/login">
            {auth.in ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Navbar />
            <Profile />
          </Route>
          <Route exact path="/my">
            <Navbar />
            <MyRecipes />
          </Route>
          <Route
            exact
            path="/recipe/:id"
            component={({ match }) => (
              <>
                <Navbar />
                <Recipe match={match} />
              </>
            )}
          />
          <Route
            exact
            path="/profile/:id"
            component={({ match }) => (
              <>
                <Navbar />
                <UserProfile match={match} />
              </>
            )}
          />
        </Switch>
      );
    }
  };

  return <Router>{getSwitch(auth.in)}</Router>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
