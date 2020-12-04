import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li style={{ marginRight: 20 }}>
        <Badge count={1}>
          <Link
            to="/shopping-cart"
            style={{ marginRight: -22, color: "#667777" }}
          >
            <ShoppingTwoTone style={{ fontSize: 40 }} />
          </Link>
        </Badge>
      </li>
      <li>
        <Link
          onClick={() => {
            dispatch(logout());
          }}
          to="#!"
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">LOGO</Link>
      </h1>
      {!auth.loading ? (
        <div>{auth.isAuthenticated ? authLinks : guestLinks}</div>
      ) : null}
    </nav>
  );
};
export default Navbar;
