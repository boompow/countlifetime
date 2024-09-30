import React, { useEffect } from "react";
import "../../style/PageComponent.css";
import { Link, useNavigate } from "react-router-dom";
// import Nav from "./Nav";
import Profile from "../../authentication/Profile";
import Logout from "../../authentication/Logout";
import useDataContext from "../../hooks/useDataContext";
import { scrollbarDisable } from "../../hooks/useScrollbarBlocker";
import { RandomColor } from "../../hooks/useRandomColor";

const Header = () => {
  const {
    setShowSignup,
    setShowLogin,
    loggedin,
    setBackgroundColor,
    isActivated,
  } = useDataContext();
  // const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isActivated) {
      navigate("/confirm-code");
    }
  }, [isActivated, navigate]);

  return (
    <div className="Header">
      <div className="top">
        <div className="logoContainer">
          <Link to={"/"}>
            <h1 className="logo1">count</h1>
            <h1 className="logo2">lifetime</h1>
          </Link>
        </div>
        <div
          className="checkLanding"
          style={{ display: !loggedin ? "flex" : "none" }}
        >
          <button
            className="loginBtn"
            title="Log in"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
              scrollbarDisable();
              setBackgroundColor(RandomColor());
            }}
          >
            Log in
          </button>
          <button
            // style={{ display: isActivated ? "flex" : "none" }}
            className="signUpBtn"
            title="Sign up"
            onClick={(e) => {
              e.preventDefault();
              setShowSignup(true);
              scrollbarDisable();
              setBackgroundColor(RandomColor());
            }}
          >
            Sign up
          </button>
          {/* <button
            style={{ display: !isActivated ? "flex" : "none" }}
            className="activateBtn"
            title="Activate your account"
            onClick={(e) => {
              e.preventDefault();
              navigate("/confirm-code");
            }}
          >
            Activate
          </button> */}
        </div>
        <div
          className="checkMain"
          style={{ display: loggedin ? "flex" : "none" }}
        >
          <Profile />
          <Logout />
        </div>
      </div>
      {/* {location.pathname === `/counter/user/${userId}` && loggedin ? (
        <Nav />
      ) : null} */}
    </div>
  );
};

export default Header;
