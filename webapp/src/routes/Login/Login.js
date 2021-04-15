import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../state/users/operations";
import { getRecipes } from "../../state/recipes/operations";
import { connect } from "react-redux";
import axios from "axios";
import { loginUser } from "../../state/auth/actions";
import "./Login.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Login = ({ users, fetchUsers, onLoginUser, fetchRecipes }) => {
  const usernames = users.map((u) => u.name);

  useEffect(() => {
    fetchUsers();
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUsers, fetchRecipes]);

  const [error, setError] = useState("");

  const handleSubmit = (values) => {
    if (!usernames.includes(values.name)) {
      setError("Invalid username");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (values.password.length <= 0) {
      setError("Password too short");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const user = users.filter((u) => u.name === values.name)[0];

    axios.post("/users/login", { id: user.id, password: values.password })
        .then(res => {
            if (res.data.auth) {
                onLoginUser({user});
                setError("");
            } else {
                setError("Invalid password");
                setTimeout(() => setError(""), 3000);
            };
        })
        .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="login__leftSection">
        <h2>Login</h2>
        <small>or create new account</small>
        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Input 
                type="text" 
                utility="form" 
                label="Username" 
                active={values.name !== ''} 
                error={error === "Invalid username"}
                errorMsg={error && "Invalid username"}
                name="name" />
              <Input
                type="password"
                utility="form"
                label="Password"
                active={values.password !== ''}
                error={error === "Invalid password" || error === "Password too short"}
                errorMsg={error === "Invalid password" || error === "Password too short" ? "Invalid password" : ''}
                name="password"
              />
              <div className="formButtons">
                <Button type="submit" text="Sign In" primary={true} />
                <Link to={"/register"}>
                  <Button text="Sign Up" primary={false} />
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login__imageSection">
        <img src="/img/img-1.jpg" alt="login-img" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(getUsers()),
  fetchRecipes: () => dispatch(getRecipes()),
  onLoginUser: (user) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);