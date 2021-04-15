import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getUsers, postUser } from "../../state/users/operations";
import "./Register.scss";
import Input from "../../components/Input/Input";

const Register = ({ users, fetchUsers, onPostUser }) => {
  const passwordRegex = /^(?=.*[0-9])(?=.{8,})/;
  const usernames = users.map((u) => u.name);

  useEffect(() => fetchUsers(), [fetchUsers]);

  const history = useHistory();
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    if (values.name.length <= 3) {
      setError("username");
      setErrorMsg("Name too short");
      setTimeout(() => setError(""), 3000);
      return;
    } else if (values.name.length >= 20) {
      setError("username");
      setErrorMsg("Name too long");
      setTimeout(() => {
        setError("");
        setErrorMsg("");
      }, 3000);
      return;
    } else if (usernames.includes(values.name)) {
      setError("username");
      setErrorMsg("Name too short");
      setTimeout(() => {
        setError("");
        setErrorMsg("");
      }, 3000);
      return;
    } else if (!passwordRegex.test(values.password)) {
      setError("password");
      setErrorMsg("Password too weak")
      setTimeout(() => {
        setError("");
        setErrorMsg("");
      }, 3000);
      return;
    } else if (values.password !== values.confirmedPassword) {
      setError("confirmedPassword");
      setErrorMsg("Passwords do not match")
      setTimeout(() => {
        setError("");
        setErrorMsg("");
      }, 3000);
      return;
    }
    const body = {
      name: values.name,
      password: values.password,
    };
    onPostUser(body);
    setError("");
    resetForm({
      name: "",
      password: "",
      confirmedPassword: "",
    });

    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  return (
    <div className="register">
      <div className="register__leftSection">
        <h2>Create Account</h2>
        <small>or use your account to sign in</small>
        {error}
        <Formik
          initialValues={{
            name: "",
            password: "",
            confirmedPassword: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Input 
                active={values.name !== ""} 
                error={error === "username"} 
                errorMsg={error === "username" && errorMsg} 
                type="text" 
                label="Username" 
                utility="form" 
                name="name" 
                values={values} />
              <Input 
                active={values.password !== ""} 
                error={error === "password"} 
                errorMsg={error === "password" && errorMsg} 
                type="password" label="Password" 
                utility="form" 
                name="password" 
                values={values} />
              <Input 
                active={values.confirmedPassword !== ""} 
                error={error === "confirmedPassword"} 
                errorMsg={error === "confirmedPassword" && errorMsg} 
                type="password" 
                label="Confirm password" 
                utility="form" 
                name="confirmedPassword" 
                values={values} />
              <div className="formButtons">
                <Button type="submit" text="Sign Up" primary={true} />
                <Link to={"/login"}>
                  <Button text="Sign In" primary={false} />
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="register__imageSection">
        <img src="/img/img-2.jpg" alt="img-register" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(getUsers()),
  onPostUser: (payload) => dispatch(postUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
