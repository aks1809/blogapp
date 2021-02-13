import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import "./Header.css";
import actions from "../../redux/auth/actions";

const { logout } = actions;

const Header = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Auth.profile);
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark "
      id="navbar"
    >
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="logo" style={{ width: "60px" }} />
      </Link>
      <Link className="navbar-brand name" to="/">
        BlogApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        style={{ justifyContent: "space-between" }}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        </ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "white", margin: "0 10px" }}>Welcome: {profile}</p>
          <button className="btn btn-danger">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
