import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alertAction";
import { register } from "../../redux/actions/authAction";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  // Redirect
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/shop" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">Create Your Account</p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};
export default Register;
