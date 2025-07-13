import React from "react";
import "../style/Signup.css";
import { useState } from "react";
import useDataContext from "../hooks/useDataContext";
import useClickOutside from "../hooks/useClickOutside";
import { UseDay, UseMonth, UseYear, UseResetDate } from "../hooks/useDate";
import UseWarningHandler from "../hooks/useWarningHandler";
import { UsePassword } from "../hooks/useRegistrationInputs";
import { useNavigate } from "react-router-dom";
import {
  scrollbarEnable,
  scrollbarDisable,
} from "../hooks/useScrollbarBlocker";
import { MdCancel } from "react-icons/md";

const Signup = () => {
  const {
    people,
    setPeople,
    addedCount,
    setAddedCount,
    showSignup,
    setShowSignup,
    setShowLogin,
    backgroundColor,
    setIsLoading,
    setIsActivated,
  } = useDataContext();
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate();

  const api = process.env.REACT_APP_API;

  const newProfile = {
    id: people ? people.length + 1 : 1,
    name: "You",
    day: birthDay,
    month: birthMonth,
    year: birthYear,
  };

  const addContentBox = (content) => {
    const newArray = [content, ...people];
    setPeople(newArray);
  };

  // removing the whole signup-popup when clicked outside
  const signupRef = useClickOutside(() => {
    scrollbarEnable();
    setShowSignup(false);
  });

  const register = async (e) => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/register",
        // "https://api.1.countlifetime.com/api/register",
        `${api}/api/register`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: 1, // the ID for the user is always going to be 1 and for those added will start from 2
            username,
            email,
            receiveEmail: true,
            password,
            birthDay,
            birthMonth,
            birthYear,
          }),
        }
      );
      const data = await response.json();
      if (!data.error) {
        setIsLoading(false);

        setBirthDay("");
        setBirthMonth("");
        setBirthYear("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        UseResetDate("signup");
        setAddedCount(addedCount - 1);
        addContentBox(newProfile);
        localStorage.setItem("act", false);
        setIsActivated(false);

        localStorage.setItem("email", email);
        // console.log(data.message);
        navigate("/confirm-code");
        setShowSignup(false);
        // console.log("code " + data.code);
      } else {
        setIsLoading(false);
        localStorage.removeItem("act");
        setBackendError(data.message);
        // console.log(data.message);
      }
      // console.log(data);
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <div
      className="signup"
      style={{
        display: showSignup ? "flex" : "none",
        backgroundColor: backgroundColor,
      }}
    >
      <div ref={signupRef} className="authContainer">
        <div
          title="Cancel"
          className=" Signup_cancel"
          onClick={(e) => {
            e.preventDefault();
            setShowSignup(false);
          }}
        >
          <MdCancel />
        </div>
        <div className="logo">
          <img src={require("../images/countlifetimeThick.png")} alt="logo" />
        </div>
        <div className="registerContainer">
          <h1>Register</h1>
          <UseWarningHandler
            birthDay={birthDay}
            birthMonth={birthMonth}
            birthYear={birthYear}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            email={email}
            classname={"signup_warning"}
            allow={allow}
            operation={"signup"} // to tailor the error warnings to signup
            setStatus={setStatus}
            setBackendError={setBackendError}
            backendError={backendError}
          />

          <form onSubmit={register}>
            <p>Enter Birthdate</p>
            <div className="form1">
              <UseDay
                setBirthDay={setBirthDay}
                title={"Day"}
                name={"dayRegistration"}
                id={"signup"}
              />
              <UseMonth
                setBirthMonth={setBirthMonth}
                title={"Month"}
                name={"monthRegistration"}
                id={"signup"}
              />
              <UseYear
                setBirthYear={setBirthYear}
                title={"Year"}
                name={"yearRegistration"}
                id={"signup"}
              />
            </div>
            <div className="form2">
              <p></p>
              <input
                title="Username"
                className="signup_username"
                required
                type="text"
                placeholder={"Username"}
                value={username}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase());
                }}
              />
              <input
                title="Email"
                value={email}
                placeholder="E-mail"
                type="email"
                className="signup_email"
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                }}
              />
              <UsePassword
                password={password}
                setPassword={setPassword}
                classname={"Signup"}
                title={"Password"}
              />
              <UsePassword
                password={confirmPassword}
                checkPassword={password}
                setPassword={setConfirmPassword}
                classname={"Signup"}
                title={"Confirm Password"}
              />
            </div>
            <button
              className="registerBtn"
              title="Sign up"
              onClick={(e) => {
                e.preventDefault();
                setAllow(true);
                // console.log(status);
                if (status) {
                  register();
                  setIsLoading(true);
                }
              }}
            >
              Sign up
            </button>
          </form>
          <div className="loginLink">
            <p
              className="signup_activate_link"
              title="Activate"
              onClick={() => {
                scrollbarDisable();
                setShowSignup(false);
                navigate("/confirm-code");
              }}
            >
              Activate
            </p>
            <p
              className="signup_login_link"
              title="Login"
              onClick={() => {
                scrollbarDisable();
                setShowSignup(false);
                setShowLogin(true);
              }}
            >
              Log in
            </p>
          </div>
        </div>
        <div className="decoration_signup"></div>
      </div>
    </div>
  );
};

export default Signup;
