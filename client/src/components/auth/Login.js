import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirect if logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/shop" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">Sign Into Your Account</p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
export default Login;
