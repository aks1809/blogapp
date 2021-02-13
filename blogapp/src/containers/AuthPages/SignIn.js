import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import background from "./images/background.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import authActions from "../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const { login } = authActions;

const SignIn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);
  const { from } = location.state || { from: { pathname: "/" } };
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  const fbLogin = () => {
    dispatch(login(12345678));
  };
  return (
    <div
      className="cover-div"
      style={{ background: `url(${background}) no-repeat center center/cover` }}
    >
      <div className="sign-in rounded-lg">
        <div className="signin-heading rounded-top">
          <img src={logo} alt="logo" />
        </div>
        <div className="signin-form">
          <a href="/auth/google">
            <div className="login-btn mb-2" style={{ background: "white" }}>
              <div className="logo">
                <FcGoogle />
              </div>
              <div>Login with Google</div>
            </div>
          </a>
          <div
            className="login-btn"
            style={{ background: "#3b5998", color: "white" }}
            onClick={fbLogin}
          >
            <div className="logo">
              <FaFacebookF />
            </div>
            <div>Login with Facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
